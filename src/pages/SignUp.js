import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

function SignUp() {
    const { register, handleSubmit } = useForm();

    const history = useHistory();

    async function onFormSubmit(data) {
        try {
          await axios.post(`http://localhost:3000/register`, {
                email:data.email,
                password:data.password,
                username:data.username,
            })
          history.push('/signin')
          ;
            console.log(data);
                } catch(e) {
                    console.error(e);
                }
                }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="input-container">
              <label htmlFor="email">E-mail </label>
          <input type="email" {...register("email")}/>
              <label htmlFor="username">Kies een gebruikersnaam</label>
              <input type="text" {...register("username")}/>
              <label htmlFor="password">Wachtwoord </label>
              <input type="password" {...register("password")}/>
              <button type="submit">Registreer</button>
          </div>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;