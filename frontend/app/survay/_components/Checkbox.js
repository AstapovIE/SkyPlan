import React from 'react';

const Checkbox = ({ checked, onChange }) => {
  return (
    <div className="relative" onClick={() => onChange(!checked)}>
      <label className="relative flex size-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-[#5b3945] via-[#c43c26] to-[#ce848a] p-2 duration-100 hover:p-2.5 cursor-pointer">
        <input type="checkbox" className="hidden" checked={checked} onChange={() => {}} />
        <div className={`size-full rounded-full bg-black transition-all ${checked ? 'scale-0' : 'scale-100'}`} />
        <div className={`absolute left-[1.3rem] h-[4px] w-[25px] rotate-[-41deg] rounded-sm bg-white transition-all ${checked ? 'translate-x-0 translate-y-0' : '-translate-x-10 -translate-y-10'}`} />
        <div className={`absolute left-3 top-7 h-[4px] w-[15px] rotate-[45deg] rounded-sm bg-white transition-all ${checked ? 'translate-x-0 translate-y-0' : '-translate-x-10 -translate-y-10'}`} />
      </label>
    </div>
  );
};

export default Checkbox;