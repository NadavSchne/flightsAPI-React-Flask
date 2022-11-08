import React from 'react'

function Flight({flight,}) {
  return (
    <div className='flightsList'>
        <label>{'from    -'}</label>
        <span>{flight.flightFrom}</span>

        <label>{'-   to  -'}  </label>
        <span>{flight.flightTo}</span>

        <label className='borderTo'>{'-    Depart Date    -'}</label>
        <span>{flight.depart}</span>

        <label>{'-    Time    '}  </label>
        <span>{flight.time}</span>

        <label>{''}</label>
        <span>{flight.dateOfReturn}</span>

        <label>{'-    price    -'}  </label>
        <span>{flight.price}</span>

        <label></label>
        <input type="checkbox" value="show connections"></input>

    </div>
  )
}

export default Flight