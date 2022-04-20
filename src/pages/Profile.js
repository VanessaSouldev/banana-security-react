import React, {useEffect, useState} from 'react';
import { useContext } from "react";
import {AuthContext} from "../components/AuthContext";
import { Link } from 'react-router-dom';
import axios from "axios";




function Profile() {
    const {user} = useContext(AuthContext);
    const [profileData, setProfiledata] = useState({});

    useEffect(() => {
        const getToken = localStorage.getItem('token')

        async function fetchLoggedUserData(data) {
            try {
                const result = await axios.get(`http://localhost:3000/get/660/private-content`,
                    {headers: {"Content-Type": "application/json", Authorization: `Bearer ${getToken}`}})
                ;
                console.log(result.data);
                setProfiledata(user)
            } catch (e) {
                console.error(e);
            }
        }
        fetchLoggedUserData(user)
    },[]);

    return (

     <>
     <h1>Profielpagina</h1>

     <section>
        <h2>Gegevens</h2>
        {Object.keys(profileData).length > 0 && (<><p><strong>Gebruikersnaam:</strong>{profileData.username}</p>
         <p><strong>Email:</strong>{profileData.email}</p></>)}
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
     </>
    );
}

export default Profile;