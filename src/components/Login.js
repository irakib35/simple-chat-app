import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import 'firebase/app';

import {auth} from '../firebase';
import firebase from 'firebase/app';

export default function Login() {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Chat App</h2>
                <div onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} className="login-button google">
                    <GoogleOutlined/> Sign In with Google
                </div>
                <br /> <br />
                <div onClick={()=>auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}  className="login-button facebook">
                    <FacebookOutlined /> Sign In with Facebook
                </div>
            </div>
        </div>
    )
}
