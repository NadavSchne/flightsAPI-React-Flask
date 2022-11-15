import React from 'react'
import Flight from './Flight'

function Flights({flights, minPrice, maxPrice, directFilter}) {
  return (
     <div className='flightsWrapper'>
        {flights.filter((flight) => flightPriceFilter(flight, minPrice, maxPrice, directFilter)
        && flightDirectFilter(flight,directFilter)).map((flight)=>
            (
              <Flight key={flight.id} flight={flight} />   //add time and legs /// reset last search
            )
        )}
    </div> 
  )
}

// Direct flight - add a filter that checks the flight.numberOfLegs === 1
const flightPriceFilter = (flight, minPrice, maxPrice) => {
  console.log('FILTER 1')
  return (flight.averagePrice >= minPrice && flight.averagePrice <= maxPrice)
          || (maxPrice === 0 && minPrice === 0)
          || (maxPrice === "" && minPrice === "")
          || (maxPrice === "" && flight.averagePrice >= minPrice)
          || (minPrice === "" && flight.averagePrice <= maxPrice)
}

const flightDirectFilter = (flight,directFilter) => {
  return (!directFilter || directFilter && flight.numberOfLegs === 0 )
}
export default Flights
// || (!directFilter)
// || (directFilter && flight.numberOfLegs === 1)








{/* <div >
{flights.map((flight)=>(
<Flight key={flight.id} flight={flight} />   //add time and legs /// reset last search
))}
</div> */}