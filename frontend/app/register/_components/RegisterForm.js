"use client";

import { useContext, useState} from "react";
import Newcontext from "../../contexts/registercontext";
import styles from './RegisterForm.module.css';
import Link from 'next/link'

export function RegisterForm() {
    const {register} = useContext(Newcontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, password)
    };
    return (
      <div className={styles.final}>
          <div className='h-screen flex flex-col items-center relative px-6 py-12 lg:px-8'>
              <div className="flex flex-col overflow-hidden bg-[#5b3945] border border-[#e89c92] rounded-xl shadow-lg max md:flex-row md:flex-1 w-1/2 h-1/7">
                  
                  {/* Левая часть формы с регистрацией */}
                  <div className="p-4 py-6 text-white bg-[#2a161e] border border-[#e89c92] md:w-2/5 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                          <img className="mx-auto h-30 w-auto" src={'/SKYPLAN.png'} alt="SkyPlan Logo" />
                          <h2 className="text-center text-xl font-semibold mt-1">Join us and reach for the sky!</h2>
                          <p className="text-center text-gray-500 text-xs mb-10">&copy;2025 SIMS. No rights reserved.</p>
                      </div>
                  </div>

                  {/* Правая часть формы */}
                  <div className="flex flex-1 flex-col items-center justify-center">
                      <h2 className="mt-10 mb-5 text-center text-4xl font-bold text-white">Register</h2>
                      <form onSubmit={handleSubmit} className="flex flex-col ml-1 gap-3">
                        <div className="flex flex-row">
                          <input type="text" placeholder=" Surname" className="form-control w-48 h-10 mr-2 text-indent-2 rounded border-[#403043] placeholder-[#ce848a]" />
                          <input type="text" placeholder=" Name " className="form-control w-48 h-10 indent-2 rounded border-[#403043] placeholder-[#ce848a]" />
                        </div>
                          <input type="email" placeholder="  Email" className="form-control w-98 h-10 text-indent-2 rounded border-[#403043] placeholder-[#ce848a]" /> 
                          <input type="text" placeholder="  Username" className="form-control text-indent-2 w-98 h-10 rounded border-[#403043] placeholder-[#ce848a]" 
                              value={username} onChange={(e) => setUsername(e.target.value)} required />
                          <input type="text" placeholder="  Address" className="form-control w-98 h-10 text-indent-2 rounded border-[#403043] placeholder-[#ce848a]" />
                          <input type="text" placeholder="  Date of Birth" className="text-[#ce848a] text-indent-2 form-control w-98 h-10 rounded border-[#403043] placeholder-[#ce848a]" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')}/>
                          <input type="password" placeholder="  Password" className="form-control text-indent-2 w-98 h-10 rounded border-[#403043] placeholder-[#ce848a]" 
                              value={password} onChange={(e) => setPassword(e.target.value)} required />
                          <p id="helper-text-explanation" className="mt-1 ml-2 text-sm text-gray-500 dark:text-gray-400">We’ll definitely share your details. Read our <a href="#" className="font-medium text-gray-500 hover:underline dark:text-gray-400">Privacy Policy</a>.</p>
                          <button type="submit" className="mt-4 h-12 font-semibold bg-[#c43c26] rounded-md shadow hover:bg-[#621e13] text-2xl text-white">
                              Register
                          </button>
                      </form>
                      <p className="mt-4 text-white text-center">
                          Already have an account? 
                          <Link href="/login"><span className="underline cursor-pointer"> Sign in</span></Link>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}