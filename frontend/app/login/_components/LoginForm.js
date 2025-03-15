"use client";

import { useContext, useState} from "react";
import Usercontext from "../../contexts/context";
import axios from "axios";

export function LoginForm() {
    const {login} = useContext(Usercontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
    };
    return (
    <div className='h-screen bg-[#110808] flex flex-col items-center justify-center relative px-6 py-12 lg:px-8'>
      <div class="flex flex-col overflow-hidden bg-[#5b3945] rounded-md shadow-lg max md:flex-row md:flex-1 w-1/2">
      <div
          class="p-4 py-6 text-white bg-[#190d12] md:w-2/5 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-30 w-auto" src={'/SKYPLAN.png'} alt="Your Company"></img>
          <p class="text-center text-gray-500 text-xs">
            &copy;2025 SIMS. No rights reserved.
          </p>
      </div>
      </div>
      <div>
        <h2 className="mt-15 mb-5 text-center items-center justify-center text-4xl font-bold tracking-tight text-white ">Sign in to your account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center relative gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="form-label flex flex-col items-center justify-center relative text-3xl text-white">Username</label>
          <input type="text" className="form-control shadow appearance-none border rounded" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="form-label form-label flex flex-col items-center justify-center relative text-white">Password</label>
          <input type="password" className="form-control border rounded" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary bg-[#c43c26] text-white">Login</button>
      </form>
      </div>
      </div>
    </div>
  );
};
