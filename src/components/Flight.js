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

    <div className='flightsListReturn'>
       <span>return:</span>
      <span>{flight.sourceReturn}</span>

      <span>{flight.destinationReturn}</span>

      <span>{flight.flightDateReturn}</span>

      <span>{flight.flightTimeReturn}</span>

      <span>{flight.numberOfLegsReturn}</span>
      <span></span>
      <span></span>
      {/* <span>{flight.averagePriceReturn}$</span> */}
    </div>

      {showConnectionDetails ? <span className='flightsConnectionList'>{flight.flightConnection}</span> : "" }
      <div>
        {showConnectionDetails ? <span className='flightsConnectionListReturn'>{flight.flightConnectionReturn}</span> : "" }
      </div>

    </div>
  )
}

export default Flight


//className='borderTo' was deleted from         <label>{'-    Depart Date    -'}</label>    <span>{flight.depart}</span>                       
        