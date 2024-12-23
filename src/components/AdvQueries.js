import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading } from '@chakra-ui/react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';


import '../App.css'

import axios from "axios";

const AdvQueries = () => {
    // variables for this page
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const months = Array.from({ length: 13 }, (_, index) => index + 1).map((month) => {
        return monthNames[month - 2];
    });
    
    // navigate home
    let navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    // retrieve adv query 1
    const [aaDelay, setaaDelay] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/api/delay-10').then((response) => {
            setaaDelay(response.data)
            console.log(response.data);
        })
    }, []);

    // retrieve adv query 2
    const [canclledDFW, setacanclledDFW] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/api/cancelledDFW-SFO').then((response) => {
            setacanclledDFW(response.data)
            console.log(response.data);
        })
    }, []);

    return (
        <div>
            <div>
                <Box mx="auto" w="30%" mb="3%" mt="3%">
                    <Table variant="simple" size='sm'>
                    <TableCaption placement="top" fontSize='l'>Number of AA Flights Delayed over 10 minutes, by month</TableCaption>
                    <Thead>
                        <Tr>
                            <Th width="30%"> Month</Th>
                            <Th># Flights Delayed</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {aaDelay.map((data) => (
                        <Tr key={data.flightNumber}>
                            <Td width="50%">{months[data.Month]}</Td>
                            <Td>{data.cCount}</Td>
                        </Tr>
                        ))}
                    </Tbody>
                    </Table>
                </Box>

            </div>

            <div>

              <Box mx="auto" w="30%">
                    <Table variant="simple" size='sm'>
                    <TableCaption placement="top" fontSize='l'>Number of Flights Cancelled from SFO to DFW by Airline</TableCaption>
                    <Thead>
                        <Tr>
                            <Th width="50%"> Airline</Th>
                            <Th># Flights Delayed</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {canclledDFW.map((data) => (
                        <Tr key={data.flightNumber}>
                            <Td width="30%">{data.Airline}</Td>
                            <Td>{data.cCount}</Td>
                        </Tr>
                        ))}
                    </Tbody>
                    </Table>
                </Box>
            </div>

            <Button onClick={navigateHome} marginLeft="31%" marginTop="3%">
                Back
            </Button>
        </div>

      )
}

export default AdvQueries
