"use client"

import { useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './SurvayForm.module.css';
import { Cpu } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';
import { Cross } from 'lucide-react';
import { Landmark } from 'lucide-react';
import { Dumbbell } from 'lucide-react';
import { Book } from 'lucide-react';
import { ChefHat } from 'lucide-react';
import { Headset } from 'lucide-react';
import Checkbox from './Checkbox';

export function Quiz()  {
  // State for each question
  const [business, setBusiness] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [color, setColor] = useState([]);
  const [weather, setWeather] = useState([]);
  const [temperature, setTemperature] = useState(20); // Default temp is 20
  const [animal, setAnimal] = useState('');

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/survey', {
        business,
        hobbies,
        color,
        weather,
        temperature,
        animal,
      });
      alert('Survey Submitted: ' + response.data.message);
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
        {currentStep === 0 && (
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of business would you like?</h3>
            <div className="flex flex-col mt-14">
            <div className={styles.container}>
            <div className={styles.container2}>
            <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
              <input type="checkbox" value="Tech" onChange={(e) => setBusiness(e.target.checked ? [...business, e.target.value] : business.filter(item => item !== e.target.value))}/>
              <div className="flex flex-row mr-3">Tech <Cpu /></div>
            </label>
            </div>
            </div>
            <div className={styles.container}>
            <div className={styles.container2}>
            <label className="text-[#ce848a] rubik-death text-4xl  flex flex-row">
              <input type="checkbox" value="Retail" onChange={(e) => setBusiness(e.target.checked ? [...business, e.target.value] : business.filter(item => item !== e.target.value))} />
              <div className="flex flex-row mr-3">Retail  <ShoppingBasket /></div>
            </label>
            </div>
            </div>
            <div className={styles.container}>
            <div className={styles.container2}>
            <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
              <input type="checkbox" value="Healthcare" onChange={(e) => setBusiness(e.target.checked ? [...business, e.target.value] : business.filter(item => item !== e.target.value))} />
              <div className="flex flex-row mr-3">Healthcare  <Cross /></div>
            </label>
            </div>
            </div>
            <div className={styles.container}>
            <div className={styles.container2}>
            <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
              <input type="checkbox" value="Finance" onChange={(e) => setBusiness(e.target.checked ? [...business, e.target.value] : business.filter(item => item !== e.target.value))} />
              <div className="flex flex-row mr-3">Finance  <Landmark /></div>
            </label>
            </div>
            </div>
            </div>
            </div>
        )}
        {currentStep === 1 && (
          <div className="flex flex-col items-center mt-5">
          <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of business would you like?</h3>
          <div className="flex flex-col mt-14">
          <div className={styles.container}>
          <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
          <input type="checkbox" value="Reading" onChange={(e) => setHobbies(e.target.checked ? [...hobbies, e.target.value] : hobbies.filter(item => item !== e.target.value))} />
            <div className="flex flex-row mr-3">Reading <Book /></div>
          </label>
          </div>
          </div>
          <div className={styles.container}>
          <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl  flex flex-row">
          <input type="checkbox" value="Reading" onChange={(e) => setHobbies(e.target.checked ? [...hobbies, e.target.value] : hobbies.filter(item => item !== e.target.value))} />
            <div className="flex flex-row mr-3">Sport<Dumbbell /></div>
          </label>
          </div>
          </div>
          <div className={styles.container}>
          <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
          <input type="checkbox" value="Reading" onChange={(e) => setHobbies(e.target.checked ? [...hobbies, e.target.value] : hobbies.filter(item => item !== e.target.value))} />
            <div className="flex flex-row mr-3">Cooking<ChefHat /></div>
          </label>
          </div>
          </div>
          <div className={styles.container}>
          <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
          <input type="checkbox" value="Reading" onChange={(e) => setHobbies(e.target.checked ? [...hobbies, e.target.value] : hobbies.filter(item => item !== e.target.value))} />
            <div className="flex flex-row mr-3">Gaming<Headset /></div>
          </label>
          </div>
          </div>
          </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What is your favorite color?</h3>
            <label>
              <input type="checkbox" value="Red" onChange={(e) => setColor(e.target.checked ? [...color, e.target.value] : color.filter(item => item !== e.target.value))} />
              Red
            </label>
            <label>
              <input type="checkbox" value="Blue" onChange={(e) => setColor(e.target.checked ? [...color, e.target.value] : color.filter(item => item !== e.target.value))} />
              Blue
            </label>
            <label>
              <input type="checkbox" value="Green" onChange={(e) => setColor(e.target.checked ? [...color, e.target.value] : color.filter(item => item !== e.target.value))} />
              Green
            </label>
            <label>
              <input type="checkbox" value="Yellow" onChange={(e) => setColor(e.target.checked ? [...color, e.target.value] : color.filter(item => item !== e.target.value))} />
              Yellow
            </label>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of weather do you like?</h3>
            <label>
              <input type="checkbox" value="Sunny" onChange={(e) => setWeather(e.target.checked ? [...weather, e.target.value] : weather.filter(item => item !== e.target.value))} />
              Sunny
            </label>
            <label>
              <input type="checkbox" value="Rainy" onChange={(e) => setWeather(e.target.checked ? [...weather, e.target.value] : weather.filter(item => item !== e.target.value))} />
              Rainy
            </label>
            <label>
              <input type="checkbox" value="Snowy" onChange={(e) => setWeather(e.target.checked ? [...weather, e.target.value] : weather.filter(item => item !== e.target.value))} />
              Snowy
            </label>
            <label>
              <input type="checkbox" value="Cloudy" onChange={(e) => setWeather(e.target.checked ? [...weather, e.target.value] : weather.filter(item => item !== e.target.value))} />
              Cloudy
            </label>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What temperature do you like?</h3>
            <input
              type="range"
              min="-30"
              max="50"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              style={{
                background: `linear-gradient(to right, blue, yellow, red)`,
              }}
            />
            <p>{temperature}°C</p>
          </div>
        )}

        {currentStep === 5 && (
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of animal is your favorite?</h3>
            <input type="text" value={animal} onChange={(e) => setAnimal(e.target.value)} />
          </div>
        )}

        <div className={styles.buttons}>
          {currentStep < 5 ? (
            <button className=" btn btn-primary h-100px w-3/5 font-semibold transition-colors duration-300 bg-[#c43c26] rounded-md shadow hover:bg-[#621e13] focus:outline-none focus:[#c43c26] focus:ring-2 text-2xl  text-white" onClick={handleNext}>Next</button>
          ) : (
            <button className=" btn btn-primary h-100px w-3/5 font-semibold transition-colors duration-300 bg-[#c43c26] rounded-md shadow hover:bg-[#621e13] focus:outline-none focus:[#c43c26] focus:ring-2 text-2xl  text-white" onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
