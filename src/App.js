import {Flex, Heading, Text, Box, Input, Divider} from "@chakra-ui/react"
import {motion} from "framer-motion"
import './App.css';
import { useState } from 'react';

function App() {

  const [city, setCity] = useState("")
  const [data, setData] = useState({})
  let MBox = motion(Box)
  let MFlex = motion(Flex)
  
  const API = "acce0dd877a50f0ea34d58a35fa44d2f"


  function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    const keyHandler = (e) => {
      if(e.key === "Enter"){
        fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=${API}`).then(res => res.json()).then(data => {
          setData(data)
          console.log(data)
        })
      }
    }
  return (
    <Flex direction="column" justify="space-between" align="center" h= "100vh" bg="teal900" >
      <Text fontSize="3xl" as="i" color="white" align="center" w="100vw">
        Weather Search
        <Divider w="100vw" />

      </Text>
      <Flex mb="20vh" direction="column"  align="center" h = "450px" w="340px" boxShadow = "dark-lg" borderRadius=".5rem" bg="gray.900"
       
      >
      <Input  value = {city} w="250px"  mb="10" mt="10" color="white" onChange = {(e) => {setCity(e.target.value)}} onKeyPress={keyHandler} placeholder='Enter the city...' label='enter the city' />
      <Flex bg="gray.900">
      {typeof data.main === "undefined" ? (
        <Text as = "i" color = "white" fontSize = "xl" align="center" bg="gray.900" justify-self="center" w="300px">
        {data.cod === "404" ? "City not Found !!" : "Welcome! Enter the city name to check the weather !!"}
      </Text>
        )
        :
        (

          
        
          <MBox  w="250px" align="center" bg="gray.900" color="white"
          initial={{
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity:1,
            scale:1
          }}
          transition={{
            duration: .5
          }}>
        <Heading bg="gray.900" pb="2" >{data.name}, {data.sys.country}</Heading>
        <Divider mb="4" />
      <Text bg="gray.900" mb="10">({getCurrentDate("-")})</Text>
           <Flex  direction="column">
           <Text bg="gray.900" fontSize="2xl">{data.weather[0].main}</Text>
           <Text bg="gray.900">{data.main.temp}°C</Text>
           </Flex>
           
           <Flex justify="space-between" bg="gray.900" pt="5">
           <Text bg="gray.900">Min : {data.main.temp_min}°C</Text>
           <Text bg="gray.900">Max : {data.main.temp_max}°C</Text>
           </Flex>
      </MBox>
      )}
    </Flex>
    </Flex>
    </Flex>

  );
}

export default App;
