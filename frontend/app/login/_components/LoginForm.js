"use client";

import { useContext, useState} from "react";
import Usercontext from "../../contexts/context";
import axios from "axios";
import styles from './LoginForm.module.css';
import Link from 'next/link'

export function LoginForm() {
    const {login} = useContext(Usercontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
    };
    return (
    <div className={styles.final}>
    <div className='h-screen flex flex-col items-center relative px-6 py-12 lg:px-8'>
      <div className="flex flex-col overflow-hidden bg-[#5b3945] border border-[#e89c92] rounded-xl shadow-lg max md:flex-row md:flex-1 w-1/2 h-1/7">
      <div
          className="p-4 py-6 text-white bg-[#2a161e] border border-[#e89c92] md:w-2/5 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-30 w-auto" src={'/SKYPLAN.png'} alt="Your Company"></img>
          <p className="text-center text-gray-500 text-xs mb-10">
            &copy;2025 SIMS. No rights reserved.
          </p>
          <p className="flex flex-col text-2xl mb-4 items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
          </p>
          <p className="flex flex-col text-3xl mb-10 items-center justify-center text-center">
          <Link href="/register">
          <button className="underline"> Get Started!</button>
          </Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-500">
            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </p>
      </div>
      </div>
      <div className=" flex flex-1 flex-col items-center justify-center">
      <h2 className="mt-15 mb-5 text-center text-4xl font-bold  text-white ">Sign in to your account</h2>
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
      </div>
    </div>
    </div>
  );
};
