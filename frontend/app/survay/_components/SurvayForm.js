"use client"

import { useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './SurvayForm.module.css';
import { Cpu, ShoppingBasket, Cross, Landmark, Dumbbell, Book, ChefHat, Headset, Sun, Cloud, Umbrella, Snowflake, Palette, Pipette,  PaintbrushVertical, PaintRoller, SunMedium, SnowflakeIcon} from 'lucide-react';
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
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row mr-4">
            <Checkbox value="Tech" checked={business.includes("Tech")} 
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">aaaaa</div>Tech <Cpu /></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Retail" checked={business.includes("Retail")} 
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">aaaaa</div>Retail <ShoppingBasket /></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Healthcare" checked={business.includes("Healthcare")} // Removed space
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Healthcare <Cross /></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Finance" checked={business.includes("Finance")} // Removed space
              onChange={(val) => setBusiness(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">aaa</div>Finance <Landmark /></div>
          </label>
        </div>
      </div>

    </div>
  </div>
)}
        {currentStep === 1 && (
          <div className="flex flex-col items-center mt-5">
    <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of hobby you like?</h3>
    <div className="flex flex-col mt-14">

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row mr-4">
            <Checkbox value="Reading" checked={hobbies.includes("Reading")} 
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Reading <Book /></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Sport" checked={hobbies.includes("Sport")} 
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">aaa</div>Sport <Dumbbell /></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Cooking" checked={hobbies.includes("Cooking")} // Removed space
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Cooking <ChefHat /></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Gaming" checked={hobbies.includes("Gaming")} // Removed space
              onChange={(val) => setHobbies(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Gaming <Headset /></div>
          </label>
        </div>
      </div>

    </div>
  </div>
)}
        {currentStep === 2 && (
          <div className="flex flex-col items-center mt-5">
    <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What is your favorite color?</h3>
    <div className="flex flex-col mt-14">

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row mr-4">
            <Checkbox value="Red" checked={color.includes("Red")} 
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">aa</div>Red<div className="text-red-600"><Palette/></div></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Green" checked={color.includes("Green")} 
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Green<div className="text-green-700"><PaintRoller/></div></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Blue" checked={color.includes("Blue")} // Removed space
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">aa</div>Blue<div className="text-blue-800"><PaintbrushVertical/></div></div>
          </label>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.container2}>
          <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
            <Checkbox value="Yellow" checked={color.includes("Yellow")} // Removed space
              onChange={(val) => setColor(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
            <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Yellow<div className="text-yellow-200"><Pipette/></div></div>
          </label>
        </div>
      </div>

    </div>
  </div>
)}

        {currentStep === 3 && (
 <div className="flex flex-col items-center mt-5">
 <h3 className="text-[#ce848a] text-4xl text-bold rubik-death">What kind of weather do you like?</h3>
 <div className="flex flex-col mt-14">

   <div className={styles.container}>
     <div className={styles.container2}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row mr-4">
         <Checkbox value="Sunny" checked={weather.includes("Sunny")} 
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Sunny<Sun/></div>
       </label>
     </div>
   </div>

   <div className={styles.container}>
     <div className={styles.container2}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Rainy" checked={weather.includes("Rainy")} 
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3"><div className="text-[#2a161e]">aa</div>Rainy<Umbrella/></div>
       </label>
     </div>
   </div>

   <div className={styles.container}>
     <div className={styles.container2}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Snowy" checked={weather.includes("Snowy")} // Removed space
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Snowy<SnowflakeIcon/></div>
       </label>
     </div>
   </div>

   <div className={styles.container}>
     <div className={styles.container2}>
       <label className="text-[#ce848a] rubik-death text-4xl flex flex-row">
         <Checkbox value="Cloudy" checked={weather.includes("Cloudy")} // Removed space
           onChange={(val) => setWeather(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])} />
         <div className="flex flex-row mr-3"><div className="text-[#2a161e]">a</div>Cloudy<Cloud/></div>
       </label>
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
            <p className="text-white text-xl">{temperature}°C</p>
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
