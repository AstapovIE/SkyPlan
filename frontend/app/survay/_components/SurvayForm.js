"use client"

import { useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './SurvayForm.module.css';
import { Wind, CloudLightning, Cpu, ShoppingBasket, Cross, Landmark, Dumbbell, Book, ChefHat, Headset, Sun, Cloud, Umbrella, Snowflake, Palette, Pipette,  PaintbrushVertical, PaintRoller, SunMedium, SnowflakeIcon} from 'lucide-react';
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
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className={styles.labels}>
          <label className="text-white rubik-death text-4xl flex flex-row mr-4">
            <Checkbox value="Tech" checked={business.includes("Tech")} 
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Tech<div className="ml-2 mt-2 text-xl"><Cpu /></div></div>
          </label>
        </div>
      </div>
      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Retail" checked={business.includes("Retail")} 
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Retail <div className="ml-2 mt-2 text-xl"><ShoppingBasket /></div></div>
          </label>
        </div>
      </div>
      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Healthcare" checked={business.includes("Healthcare")} // Removed space
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Healthcare<div className="ml-2 mt-2 text-xl"><Cross /></div></div>
          </label>
        </div>
      </div>

      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Finance" checked={business.includes("Finance")} // Removed space
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Finance <div className="ml-2 mt-2 text-xl"><Landmark /></div></div>
          </label>
        </div>
      </div>
      </div>
    </div>
  </div>
)}
        {currentStep === 1 && (
          <div className="flex flex-col items-center mt-5">
    <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of hobby you like?</h3>
    <div className="flex flex-col mt-14">
    <div className="grid grid-cols-2 gap-4">
      <div>
       <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row mr-4">
            <Checkbox value="Reading" checked={hobbies.includes("Reading")} 
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Reading <div className="ml-2 mt-2 text-xl"><Book /></div></div>
          </label>
        </div>
      </div>

      <div>
       <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Sport" checked={hobbies.includes("Sport")} 
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Sport<div className="ml-2 mt-2 text-xl"><Dumbbell /></div></div>
          </label>
        </div>
      </div>

      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Cooking" checked={hobbies.includes("Cooking")} // Removed space
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Cooking <div className="ml-2 mt-2 text-xl"><ChefHat /></div></div>
          </label>
        </div>
      </div>

      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Gaming" checked={hobbies.includes("Gaming")} // Removed space
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Gaming <div className="ml-2 mt-2 text-xl"><Headset /></div></div>
          </label>
        </div>
      </div>
    </div>
    </div>
  </div>
)}
        {currentStep === 2 && (
          <div className="flex flex-col items-center mt-5">
    <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What is your favorite color?</h3>
    <div className="flex flex-col mt-14">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row mr-4">
            <Checkbox value="Red" checked={color.includes("Red")} 
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Red<div className="ml-2 mt-2 text-xl text-red-600"><Palette/></div></div>
          </label>
        </div>
      </div>

      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Green" checked={color.includes("Green")} 
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Green<div className="ml-2 mt-2 text-xl text-green-700"><PaintRoller/></div></div>
          </label>
        </div>
      </div>

      <div>
       <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Blue" checked={color.includes("Blue")} // Removed space
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Blue<div className="ml-2 mt-2 text-xl text-blue-800"><PaintbrushVertical/></div></div>
          </label>
        </div>
      </div>

      <div>
        <div className={styles.labels}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Yellow" checked={color.includes("Yellow")} // Removed space
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3 ml-2">Yellow<div className="ml-2 mt-2 text-xl text-yellow-200"><Pipette/></div></div>
          </label>
        </div>
      </div>
    </div>
    </div>
  </div>
)}

        {currentStep === 3 && (
 <div className="flex flex-col items-center mt-5">
 <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of weather do you like?</h3>
 <div className="flex flex-col mt-14">
  <div className="grid grid-cols-2 gap-4">
   <div>
     <div className={styles.labels}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row mr-4">
         <Checkbox value="Sunny" checked={weather.includes("Sunny")} 
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3 ml-2">Sunny<div className="ml-2 mt-2 text-xl"><Sun/></div></div>
       </label>
     </div>
   </div>

   <div>
     <div className={styles.labels}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Rainy" checked={weather.includes("Rainy")} 
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3 ml-2">Rainy<div className="ml-2 mt-2 text-xl"><Umbrella/></div></div>
       </label>
     </div>
   </div>

   <div>
     <div className={styles.labels}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Snowy" checked={weather.includes("Snowy")} // Removed space
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3 ml-2">Snowy<div className="ml-2 mt-2 text-xl"><SnowflakeIcon/></div></div>
       </label>
     </div>
   </div>

   <div>
     <div className={styles.labels}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Cloudy" checked={weather.includes("Cloudy")} // Removed space
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3 ml-2">Cloudy<div className="ml-2 mt-2 text-xl"><Cloud/></div></div>
       </label>
     </div>
   </div>
   <div>
     <div className={styles.labels}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Stormy" checked={weather.includes("Stormy")} // Removed space
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3 ml-2">Stormy<div className="ml-2 mt-2 text-xl">< CloudLightning/></div></div>
       </label>
     </div>
   </div>
   <div>
     <div className={styles.labels}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Windy" checked={weather.includes("Windy")} // Removed space
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3 ml-2">Windy<div className="ml-2 mt-2 text-xl"><Wind/></div></div>
       </label>
     </div>
   </div>
   </div>
 </div>
</div>
)}
        {currentStep === 4 && (
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-[#ce848a] text-4xl text-bold rubik-death mb-16">What temperature do you like?</h3>
            <input
              type="range"
              min="-30"
              max="50"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className={styles.myslider}/>
            <p className="text-white text-xl mt-2">{temperature}°C</p>
          </div>
        )}

        {currentStep === 5 && (
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">Do you humid climats?</h3>
            <input className="mt-10 w-1/2" type="text" value={animal} onChange={(e) => setAnimal(e.target.value)} />
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
