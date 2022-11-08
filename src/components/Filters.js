import React from 'react'
import { useState } from 'react';

function Filters() {

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const handleChange1 = event => {
      const result = event.target.value.replace(/\D/g, '');
  
      setMin(result);
    };
    const handleChange2 = event => {
        const result = event.target.value.replace(/\D/g, '');
    
        setMax(result);
      };


  return (
    <div className='filters'>
        <label className='filterResults'>Filter Results:</label>

        <label className='labelCheckBox1'>Direct Flights</label>
        <input className='checkBox1' type='checkbox' ></input>

        <label className='labelPriceRange'>Price range from</label>
        <input className='inputMin' type="text" value={min} onChange={handleChange1} ></input>
        <label className='labelPriceRangeTo'>to</label>
        <input className='inputMax' type="text" value={max} onChange={handleChange2}></input>

    </div>
  )
}

export default Filters