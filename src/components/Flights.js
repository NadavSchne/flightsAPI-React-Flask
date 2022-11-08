import React from 'react'
import Flight from './Flight'

function Flights({flights}) {
  return (
    <div >
        {flights.map((flight)=>(
        <Flight key={flight.id} flight={flight} />   //add time and legs /// reset last search
        ))}
    </div>
  )
}

export default Flights