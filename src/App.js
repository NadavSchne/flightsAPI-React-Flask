import { useEffect, useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Flight from "./components/Flight";
import Flights from "./components/Flights";
import Logo from "./components/Logo";
import DetailsDescription from "./components/DetailsDescription";

function App() {

  // const [data, setData] = useState([{}])
  const [flights, setFlights] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [directFilter, setDirectFilter] = useState(false)

  // const [connectionFlights, setConnectionFlights] = useState([])


  const searchFlightAsync = async (flight) => {
    const dataSend = {dep:flight.flightFrom, arr:flight.flightTo, dateDep:flight.depart, dateReturn:flight.dateOfReturn, oneWay:flight.oneWay};
    let response = await fetch(`api/flight/search?dep=${encodeURIComponent(dataSend.dep)}&arr=${encodeURIComponent(dataSend.arr)}&dateDep=${encodeURIComponent(dataSend.dateDep)}&dateReturn=${encodeURIComponent(dataSend.dateReturn)}&oneWay=${encodeURIComponent(dataSend.oneWay)}`, {
      method: "GET",
    })

    let responseJSON = await response.json()
    // if(responseJSON.length==1)
    //   alert('please choose ')
    let flightArray = buildFlightArray(responseJSON, flight)  //create flight array from response file relevant data
    setFlights(flightArray)                                   // set array into flights useState      
  }

  

  const buildFlightArray = (responseJSON, flight) => {
    let flightArray = []
    console.log(responseJSON)

    const flightTimeRegExp = /\d\d:\d\d:\d\d/
    const flightDateRegExp = /\d\d\/\d\d\/\d\d\d\d/

    
        
    
    for(let i = 1; i < responseJSON.length; i++){

      let connectionString=""
      for(let j=1;j<responseJSON[i].Segments[0].Legs.length; j++){
        var An = responseJSON[i].Segments[0].Legs[j].DeparturePoint.AirportCode //(responseJSON[i].Segments[0].Legs[i].DepaturePoint)
        var Dt = responseJSON[i].Segments[0].Legs[j].DeparturePoint.DateTime
        connectionString+='Airport Name:' + An + '___________Day and Time:'+Dt+'________'
      }

      let key = responseJSON[i].Segments[0].Key
      let flightObj = {
        airlineName: responseJSON[i].Segments[0].Legs[0].AirlineName,
        numberOfLegs: responseJSON[i].Segments[0].Legs.length-1,
        averagePrice: responseJSON[i].AveragePrice,
        source: flight.flightFrom,
        destination: flight.flightTo,
        flightTime: key.match(flightTimeRegExp)[0],
        flightDate: key.match(flightDateRegExp)[0],
        id: i,
        flightConnection: connectionString

      }
      console.log(connectionString)

      flightArray[i - 1] = flightObj
    }

    return flightArray
  }



  const handleMinPriceChange = event => {
    const result = event.target.value.replace(/\D/g, '');

    setMinPrice(result);
  };

  const handleMaxPriceChange = event => {
    const result = event.target.value.replace(/\D/g, '');

    setMaxPrice(result);
  };

  // const handleDirectClick = event => {
  //   console.log(event.target.value)
  //   setDirectFilter(!directFilter)
  // }


  return (
    <div>
      <div className="mainDiv">
        <Header></Header>

        <Container onSearch={searchFlightAsync}  ></Container> 

        {flights.length > 0 ? <div className='filters'>
          <label className='filterResults'>Filter:</label>
          <span>{".."}</span>
          <label className='labelCheckBox1'>Direct Flights</label>
          <input className='checkBox1' type='checkbox' checked={directFilter} onChange={(e)=> setDirectFilter(e.currentTarget.checked)}></input>
          <span>{".."}</span>
          <label className='labelPriceRange'>Price range from:</label>
          <input className='inputMin' type="text" value={minPrice} onChange={handleMinPriceChange} ></input>
          <label className='labelPriceRangeTo'>to:</label>
          <input className='inputMax' type="text" value={maxPrice} onChange={handleMaxPriceChange}></input>
        </div>:""}

        {flights.length > 0 ? <DetailsDescription/>: ''}

        {flights.length > 0 ? <Flights flights={flights} minPrice={minPrice} maxPrice={maxPrice} directFilter={directFilter} />
        : 'No Flights To Show'}
      
      </div>

      <Logo></Logo>
    </div>


  );
}

export default App;




{/* <input className='checkBox1' type='checkbox' onClick={handleDirectClick}></input> */}




// useEffect(()=>{
//   fetch('/api/flight/search').then(
//     res=>res.json()).then(
//       data => {setData(data)
//         console.log(data)       
//       }
//     )
// },[])



// const searchFlight=(flight)=>{
//   const dataSend = {dep:flight.flightFrom, arr:flight.flightTo, dateDep:flight.depart, dateReturn:flight.dateOfReturn};
//   fetch(`api/flight/search?dep=${encodeURIComponent(dataSend.dep)}&arr=${encodeURIComponent(dataSend.arr)}&dateDep=${encodeURIComponent(dataSend.dateDep)}&dateReturn=${encodeURIComponent(dataSend.dateReturn)}`, {
//     method: "GET",
//   }).then(res=>res.json()).then((data1) => setData(data1))   // fetching data from service side

  
//     console.log(data)
//   // for(let i = 1; i < data.length; i++){                  //  run over all returned flights
//     var n = data[1]
//     var b=Object.entries(n)
//     flight.price=b[0][1]
 

//     const id = Math.floor(Math.random() * 10000)+1
//     const newFlight = {id,...flight}
//     setFlights([...flights,newFlight])                    // store each flight with its data
  

// }


// const searchFlight=(flight)=>{
//   console.log("in searchFlight")
//   const dataSend = {dep:flight.flightFrom, arr:flight.flightTo, dateDep:flight.depart, dateReturn:flight.dateOfReturn, oneWay:flight.oneWay};
//   fetch(`api/flight/search?dep=${encodeURIComponent(dataSend.dep)}&arr=${encodeURIComponent(dataSend.arr)}&dateDep=${encodeURIComponent(dataSend.dateDep)}&dateReturn=${encodeURIComponent(dataSend.dateReturn)}&oneWay=${encodeURIComponent(dataSend.oneWay)}`, {
//     method: "GET",
//   }).then(res=>{
//     console.log("in res")
//     console.log(res)
//     var x = res.json()
//     console.log(x)

//   }).then((data1) => {
//     console.log("data1:" + data1)
//     setData(data1)
//   })   // fetching data from service side

  
//     console.log(data)
//   // for(let i = 1; i < data.length; i++){                  //  run over all returned flights
//   data.forEach((flight) => {
//     console.log("flight:" + flight)
//   })
//     var price = data[1]
//     price=Object.entries(price)
//     console.log("price:" + price)
//     flight.price=price[0][1]
    
//     var key=Object.entries(price[3][1][0])               // create key array of date,time,locations
//     // console.log(key)
//     var companyName = key                              // create new path for companyname in order not to lose 'key'

//     key = key[3][1]                                     // key is complete
//     key = key.split('-')
//     flight.time = (key[2])
//     flight.flightFrom = key[1]

//     var connectionInfo = companyName[4]                // create new path for connection info - not to lose company name
    
//     companyName= Object.entries(companyName[4][1][0])
//     flight.airlineName =  companyName[2][1]

    // var connectionSize = connectionInfo.length
    // console.log(connectionInfo)
    // console.log(connectionInfo[1][1])
    // console.log(connectionInfo.length)
    // connectionInfo = Object.entries(connectionInfo[1][1])
    // console.log(connectionInfo)
    // var connectionDep = connectionInfo[5][1]
    // var connectionArr=connectionInfo[3][1]
    // console.log("this is string")
    // console.log(connectionDep)
    // console.log(connectionArr)


//     var connectionString
//     for(let i = 1; i < connectionInfo.length; i++){
//       var temp = connectionInfo
//       temp = temp[1][i]
//       temp = Object.entries(temp)
//       console.log(temp)
//       var connectionDep = temp[5][1]
//       var connectionArr = temp[3][1]
//       console.log(connectionDep)
//       console.log(connectionArr)
//       var connectionString1 = JSON.stringify(connectionDep)
//       var connectionString2 = JSON.stringify(connectionArr)
//       connectionString = connectionString1 + '\n\n' + connectionString2
//       console.log(connectionString1)
//       console.log(connectionString2)
//       console.log(connectionString)
//     }
//     flight.legs=connectionString.replace(/\"/g, ' ')
//     console.log(connectionString)

//     const id = Math.floor(Math.random() * 10000)+1
//     const newFlight = {id,...flight}
//     setFlights([...flights,newFlight])                    // store each flight with its data
// }

