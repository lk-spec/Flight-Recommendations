// calculate recommendations
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import '../App.css'

import { Button, Heading, Center } from '@chakra-ui/react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';


import axios from "axios";

const Recommendations = () => {

// navigate home
let navigate = useNavigate();
const navigateHome = () => {
    navigate('/');
}

// get data from Home Page
const location = useLocation();
const originAirport = location.state.origin;
const destinationAirport = location.state.destination;
const month_ = location.state.month;

const [avgDelays, setAvgDelays] = useState([]);
useEffect(() => {
    axios.get('http://localhost:3002/api/airlines-least-delayed', {
        params: {
            Origin: originAirport,
            Destination: destinationAirport,
            Month: month_
        }
    }).then((response) => {
        setAvgDelays(response.data);
        console.log("delayed airlines", response.data);
    }).catch((error) => {
        console.error(error);
    });
}, []);


const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const months = Array.from({ length: 13 }, (_, index) => index + 1).map((month) => {
    return monthNames[month - 2];
});

return (
    <div>
        <Center spacing={3} marginTop="3%">
            <div>
                <Heading>
                    Your Recommendations:
                </Heading>
                <Center>
                Origin: {originAirport} <br/>
                Destination: {destinationAirport} <br/>
                Month: {months[month_]} <br/>
                </Center>
            </div>
        </Center>

        <div>

            <Box mx="auto" w="30%">
                <Table variant="simple" size='sm'>
                <TableCaption placement="top" fontSize='l'>Best Airlines based on Travel Details</TableCaption>
                <Thead>
                    <Tr>
                        <Th width="50%"> Airline</Th>
                        <Th>Arrival Delay (Minutes)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {avgDelays.map((data) => (
                    <Tr key={data.flightNumber}>
                        <Td width="30%">{data.Airline}</Td>
                        <Td>{Math.round(data.avgDelay * 100) / 100}</Td>
                    </Tr>
                    ))}
                </Tbody>
                </Table>
            </Box>
            <Box fontSize='sm' textAlign='center' mt='2'>
                *Negative values signify early arrival
            </Box>

        </div>

        <Button onClick={navigateHome} marginLeft="31%" marginTop="5%">
            Back
        </Button>
    </div>
  )
}

export default Recommendations