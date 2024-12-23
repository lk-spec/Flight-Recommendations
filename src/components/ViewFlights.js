import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

import { Button, Center, Heading, Container, Stack, Input, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

import axios from "axios";

const ViewFlights = () => {
    // variables for this page
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [flightData, setFlightData] = useState([]);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const months = Array.from({ length: 13 }, (_, index) => index + 1).map((month) => {
        return monthNames[month - 2];
    });

    // page navigation to Advanced Queries page
    // navigate home
    let navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    // handle submit should display flight data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get(`http://localhost:3002/api/view-flights/${firstName}/${lastName}`);
          setFlightData(response.data);
        } catch (error) {
          console.error(error);
        }
      };


    return (
        <div>
            <Container>
                <form>
                    <br/>
                    <Heading>
                        Enter Name:
                    </Heading>
                    <br/>
                    <form>

                        <Stack spacing={3}>

                            <Input
                            placeholder='First Name'
                            id="first_name_"
                            name="first_name_"
                            type="text"
                            onChange={event => setFirstName(event.target.value)}
                            value={firstName}
                            size='md'
                            />

                            <Input
                            placeholder='Last Name'
                            id="last_name_"
                            name="last_name_"
                            type="text"
                            onChange={event => setLastName(event.target.value)}
                            value={lastName}
                            size='md'
                            />

                        </Stack>

                        <Button type="submit" className='submit-button' onClick={handleSubmit}>Submit</Button> <br />

                        {flightData.length > 0 ? (
                            <Table variant="simple">
                            <TableCaption placement="top" fontSize="l">Flight details for {firstName} {lastName}</TableCaption>
                            <Thead>
                                <Tr>
                                <Th>Airline</Th>
                                <Th>Origin</Th>
                                <Th>Destination</Th>
                                <Th>Month</Th>
                                <Th>Delay Time (minutes)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {flightData.map((data) => (
                                <Tr key={data.flightNumber}>
                                    <Td>{data.Airline}</Td>
                                    <Td>{data.Origin}</Td>
                                    <Td>{data.Destination}</Td>
                                    <Td>{months[data.Month]}</Td>
                                    <Td>{data.ArrivalDelay}</Td>
                                </Tr>
                                ))}
                            </Tbody>
                            </Table>
                        ) : (
                            <Text>No flight data found for {firstName} {lastName}.</Text>
                        )}

                    </form>
                    <br />
                    <Button onClick={navigateHome}>
                        back
                    </Button> 
                </form>
            </Container>
            
        </div>
    )
}

export default ViewFlights