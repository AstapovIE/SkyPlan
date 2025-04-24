import React from 'react';

const Checkbox = ({ value, checked, onChange }) => {
  return (
    <div className="relative" onClick={() => onChange(value)}>
      <label className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-[#5b3945] to-[#c43c26] p-2 duration-100 hover:p-2.5">
        <input type="checkbox" className="group peer hidden" checked={checked} onChange={() => {}} />
        <div className={`size-full rounded-full ${checked ? 'bg-white' : 'bg-black'}`} />
      </label>
    </div>
  );
};

export default Checkbox;