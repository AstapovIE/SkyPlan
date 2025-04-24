"use client";

import { useState } from "react";
import axios from "axios";
import styles from './SurvayForm.module.css';

export function Quiz() {
  const [tmin, setTmin] = useState('');
  const [tmax, setTmax] = useState('');
  const [tavg, setTavg] = useState('');
  const [prcp, setPrcp] = useState('');
  const [wspd, setWspd] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/survey', {
        tmin: parseFloat(tmin),
        tmax: parseFloat(tmax),
        tavg: parseFloat(tavg),
        prcp: parseFloat(prcp),
        wspd: parseFloat(wspd),
      });
      alert('Survey Submitted: ' + response.data.message);
      window.location.href = "/dashboard/";
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit the survey. Please try again.');
    }
  };

  return (
    <div className={styles.final}>
      <div className="flex h-screen w-screen items-center relative">
        <div className={styles.card}>
          <div className={styles.card__border}></div>
          <h3 className="text-[#ce848a] text-4xl text-bold rubik-death mb-10 text-center">
            Enter Weather Data
          </h3>
          <div className="flex flex-col gap-2 w-full px-6">
          <div className="text-white text-xl rubik-death">Минимальная температура</div>
          <input type="range" min="-30" max="20"
              value={tmin}
              onChange={(e) => setTmin(e.target.value)}
              className={styles.myslider} required/>
            <p className="text-white text-xl mt-1">{tmin}°C</p>
            <div className="text-white text-xl rubik-death">Максимальная температура</div>
            <input type="range" min="20" max="60"
              value={tmax}
              onChange={(e) => setTmax(e.target.value)}
              className={styles.myslider} required/>
            <p className="text-white text-xl mt-1">{tmax}°C</p>
            <div className="text-white text-xl rubik-death">Cредняя температура</div>
            <input type="range" min="16" max="30"
              value={tavg}
              onChange={(e) => setTavg(e.target.value)}
              className={styles.myslider} required/>
            <p className="text-white text-xl mt-1">{tavg}°C</p>
            <div className="text-white text-xl rubik-death">Осадки</div>
            <input type="number" placeholder="Precipitation (prcp)" value={prcp} onChange={(e) => setPrcp(e.target.value)} className="rounded border-[#403043] placeholder-[#ce848a]" required/>
            <div className="text-white text-xl rubik-death">Скорость ветра</div>
            <input type="number" placeholder="Wind Speed (wspd)" value={wspd} onChange={(e) => setWspd(e.target.value)} className="rounded border-[#403043] placeholder-[#ce848a]" required />
            <button
              className="mt-6 btn btn-primary h-100px font-semibold transition-colors duration-300 bg-[#c43c26] rounded-md shadow hover:bg-[#621e13] text-2xl text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
