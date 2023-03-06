import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(()=>{        
        auth.onAuthStateChanged((user) => {            
            setUser(user);
            setLoading(false);
            user !== null ? history.push('./chats') : history.push('./login');
        })        
    }, [user, history]);


    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
   )

}