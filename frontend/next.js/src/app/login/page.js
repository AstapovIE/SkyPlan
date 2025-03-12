"use client";

import { useContext, useState } from "react";
import Authcontext from "../authstuff/authcontext";
import axios from "axios";

const Login = ()=>{
    const{login} = useContext(Authcontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [registerUsername, setRegisterUsername] = useState('');
    // const [registerPassword, setRegisterPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
    };

    // const handleRegister = async (e) => {
      //e.preventDefault();
      //try {
        //const response = await axios.post('http://localhost:8000/auth/login', {
         // username: registerUsername,
          //password: registerPassword,
       // });
      //  login(registerUsername, registerPassword);
    //  } catch(error) {
     //   console.error('Failed to register user:', error);
    // }
  //}

    return (
        <div className="container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      );

};

export default Login;
