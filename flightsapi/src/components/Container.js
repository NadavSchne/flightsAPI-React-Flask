import React from 'react'
import { useState } from 'react'


function Container({onSearch}) {

    const [flightFrom, setFlightFrom] = useState('')
    const [flightTo, setFlightTo] = useState('')
    const [depart, setDepart] = useState('')
    const [dateOfReturn, setDateOfReturn] = useState('')
    const [oneWay, setOneWay] = useState(true)
    const [price,setPrice] = useState('')
    const [legs,setLegs] = useState('')
    const [airlineName,setAirlineName] = useState('')
    const [returnText,setReturnText] = useState('return:')

    console.log(depart)



    const onSubmit= (e) => {
        e.preventDefault()
        console.log("in onSubmit")

        if(!flightFrom ||!flightTo ||!depart){
            alert('Please fill the flight\'s details.')
            return
        }

         onSearch({flightFrom,flightTo,depart,dateOfReturn,oneWay,price,legs,airlineName,returnText})

        // setFlightFrom('')
        // setFlightTo('')
        // setDepart('')
        // setDateOfReturn('')
        // setPrice('')
        // setLegs('')
        // setAirlineName('')
        // setOneWay(oneWay)
    }

  return (

    <div className='container'>
    <form className='containerForm' onSubmit={onSubmit}>
    <input type="text" placeholder="depart from" value={flightFrom} onChange={(e)=>setFlightFrom(e.target.value)}/>
    <input type="text" placeholder="arrive at" value={flightTo} onChange={(e)=>setFlightTo(e.target.value)}/>
    <label>Date of departure</label>
    <input type="date" placeholder="depart" value={depart} onChange={(e)=>setDepart(e.target.value)}/>
    {oneWay ? <label></label> : <label>Date of Return</label>}
    {oneWay ? <label></label>: <input type="date" placeholder="return" value={dateOfReturn} onChange={(e)=>setDateOfReturn(e.target.value)}/>}

    <div className='containerButton'>
         <div>
          <label>One Way Trip</label>
          <input type="checkbox" checked={oneWay}
           value={oneWay} 
          onChange={(e)=> setOneWay(e.currentTarget.checked)}/>

        </div>

        <input type="submit" value='Search'
            className='btn btn-success' />
        </div>

    </form>
    </div>

  )
}

export default Container