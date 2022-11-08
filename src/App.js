import { useEffect, useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Flight from "./components/Flight";
import Flights from "./components/Flights";


function App() {

  const [data, setData] = useState([{}])
  const [flights, setFlights] = useState([])



const searchFlight=(flight)=>{
  const dataSend = {dep:flight.flightFrom, arr:flight.flightTo, dateDep:flight.depart, dateReturn:flight.dateOfReturn};
  fetch(`api/flight/search?dep=${encodeURIComponent(dataSend.dep)}&arr=${encodeURIComponent(dataSend.arr)}&dateDep=${encodeURIComponent(dataSend.dateDep)}&dateReturn=${encodeURIComponent(dataSend.dateReturn)}`, {
    method: "GET",
  }).then(res=>res.json()).then((data1) => setData(data1))   // fetching data from service side

  
    console.log(data)
  // for(let i = 1; i < data.length; i++){                  //  run over all returned flights
    var n = data[1]
    var b=Object.entries(n)
    flight.price=b[0][1]
 

    const id = Math.floor(Math.random() * 10000)+1
    const newFlight = {id,...flight}
    setFlights([...flights,newFlight])                    // store each flight with its data
  

}



  return (
    <div className="mainDiv">
      <Header></Header>
      <Container onSearch={searchFlight}  ></Container> 
      {flights.length > 0 ? <Filters></Filters>:""}
      {flights.length > 0 ? <Flights flights={flights} /> : 'No Flights To Show'}
  


    </div>
  );
}

export default App;




// useEffect(()=>{
//   fetch('/api/flight/search').then(
//     res=>res.json()).then(
//       data => {setData(data)
//         console.log(data)       
//       }
//     )
// },[])


