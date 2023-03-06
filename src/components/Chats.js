import React, {useRef, useState, useEffect } from 'react'
import { ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuth } from './../contexts/AuthContext';
import axios from 'axios';

export default function Chats() {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('./');
    }    

    const getfile = async (url) =>{
        const respose = await fetch(url);
        const data = await respose.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user){
            history.push('/');
            return;
        }
        
        axios.get('https://api.chatengine.io/users/', {
            Headers: {
                "project-id" : process.env.REACT_APP_CHAT_APP_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then((result) => {
            setLoading(false);            
        }).catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            getfile(user.photoURL)
            .then((avatar) =>{
                formdata.append('avatar', avatar, avatar.name);
                axios.post('https://api.chatengine.io/users/', formdata, {
                    headers:{
                        "private-key" : process.env.REACT_APP_CHAT_APP_KEY
                    }
                }).then(() => setLoading(false) )
                .catch((err) => console.log(err) )
            })
        })
        
    },[user, history]);


    if(user=== null || loading) return "Loading...";

    return (
        <div className='chat-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Chat APP
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>

            <ChatEngine 
                height="Calc(100vh-66px)"
                projectID={process.env.REACT_APP_CHAT_APP_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}
