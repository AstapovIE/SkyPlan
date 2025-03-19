"use client";

import { useContext, useState} from "react";
import Newcontext from "../../contexts/registercontext";
import axios from "axios";
import styles from './RegisterForm.module.css';
import Link from 'next/link'

export function RegisterForm() {
    const {register} = useContext(Newcontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        await register(username, password)
    };
    return (
      <div className=" flex flex-1 flex-col items-center justify-center">
      <h2 className="mt-15 mb-5 text-center text-4xl font-bold  text-white ">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col ml-1 gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
          <label htmlFor="username" className="text-2xl text-semi-bold right-[4rem] text-[#ce848a]">Username</label>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ce848a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <input type="text" placeholder="  milkisway" className="form-control caret-[#5b3945] text-[#5b3945] text-lg text-semi-bold w-96 h-10 shadow appearance-none transition duration-300 border rounded border-[#403043] focus:border-transparent focus:outline-none focus:ring-4 focus:ring-[#c43c26] placeholder-[#ce848a] placeholder-opacity-75" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <label htmlFor="password" className="text-2xl text-semi-bold right-[4rem] text-[#ce848a]">Password</label>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ce848a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
          <input type="password" placeholder="  ********" className="form-control caret-[#5b3945] text-[#5b3945] text-lg text-semi-bold w-96 h-10 shadow appearance-none transition duration-300 border rounded border-[#403043] focus:border-transparent focus:outline-none focus:ring-4 focus:ring-[#c43c26] placeholder-[#ce848a] placeholder-opacity-75" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="mt-4 btn btn-primary h-12 font-semibold transition-colors duration-300 bg-[#c43c26] rounded-md shadow hover:bg-[#621e13] focus:outline-none focus:[#c43c26] focus:ring-2 text-2xl  text-white">Login</button>
      </form>
      </div>
  );
};