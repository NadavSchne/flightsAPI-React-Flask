import React, { useState } from 'react'


function Flight({flight}) {
  const [showConnectionDetails, setShowConnectionDetails] = useState(false)

  return (
    <div className='topOfFlightList'>

    <div className='flightsList'>               

        <span>{flight.airlineName}</span>

        <span>{flight.source}</span>

        <span>{flight.destination}</span>

        <span>{flight.flightDate}</span>

        <span>{flight.flightTime}</span>

        <span>{flight.numberOfLegs}</span>



        <span>{flight.averagePrice}$</span>

        <input type='checkbox' checked={showConnectionDetails}
        onChange={(e)=> setShowConnectionDetails(e.currentTarget.checked)}></input>

    </div>
      {showConnectionDetails ? <span className='flightsConnectionList'>{flight.flightConnection}</span> : "" }
    </div>
  )
}

export default Flight


//className='borderTo' was deleted from         <label>{'-    Depart Date    -'}</label>    <span>{flight.depart}</span>                       
        