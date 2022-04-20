import React, {useEffect, useState} from 'react';
import {createContext} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({isAuth: false, user: null, status:'pending'});
    const history = useHistory();

    useEffect(() => {
        const getToken = localStorage.getItem('token')
        if (getToken) {
            const decoded = jwt_decode(getToken);
            getUserData(decoded.sub, getToken )
        } else {
            toggleAuth({...auth, isAuth:false,
                user: null,
                status:'done',
            })

        }

    },[]);

    async function getUserData(id, token) {
        try{
            const result = await axios.get(`http://localhost:3000/600/users/${id}`,
                { headers:{"Content-Type": "application/json", Authorization: `Bearer ${token}`}})
            console.log(result.data);
            toggleAuth({...auth, isAuth:true,
            user: {
                username:result.data.username,
                email:result.data.email,
                id:result.data.id,
            }, status:'done'
            })
            history.push('/profile');
    } catch (error) {
        console.error(error);
            toggleAuth({
                ...auth, isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }


    function signIn(jwt) {
        const decoded = jwt_decode(jwt);
        console.log(decoded);
        getUserData(decoded.sub, jwt)
        console.log('Gebruiker is ingelogd');
        localStorage.setItem('token', jwt);

    }

    function signOut() {
        toggleAuth({...auth, isAuth:false, user: null});
        console.log('Gebruiker is uitgelogd');
        history.push('/');
        localStorage.removeItem('token');
    }

    console.log();

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        logout: signOut,
        login: signIn,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status==='done' ?
            {children} : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
