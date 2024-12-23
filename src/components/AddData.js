import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Center, Heading, Container, Stack, Input, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import '../App.css'

import axios from "axios";

const AddData = () => {
    // variables for this page
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [airline, setAirline] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [month, setMonth] = useState('');
    const [delayTime, setDelayTime] = useState('');
    const [cancelled, setCancelled] = useState('');
    const [flightId, setFlightId] = useState('');
    
    // navigate home
    let navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    useEffect(() => {
        axios.get('http://localhost:3002/api/get-flight-id', {
            params: {
            }
        }).then((response) => {
            setFlightId(response.data[0].flightId + 1)
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    // handle submit should update flights
    const handleSubmit = event => {
        console.log('handleSubmit run');
        event.preventDefault();  // prevent page refresh

        //insert data into Schedule
        axios.post('http://localhost:3002/api/add-data-schedule', {
            FlightId: flightId,
            FirstName: firstName,
            LastName: lastName
        }).then(() => {
            alert(('success'))
        })  

        axios.post('http://localhost:3002/api/add-data-flights', {
            FlightId: flightId,
            FirstName: firstName,
            LastName: lastName,
            Airline: airline,
            Origin: origin,
            Destination: destination,
            Month: monthMap.get(month)            
        }).then(() => {
            alert(('success'))
        })  
        
        // //insert data into Delays
        axios.post('http://localhost:3002/api/add-data-delays', {
            FlightId: flightId,
            DelayTime: delayTime
        }).then(() => {
            alert(('success'))
        }) 
        // //insert data into Cancelled
        axios.post('http://localhost:3002/api/add-data-cancelled', {
            FlightId: flightId,
            Cancelled: optionsCancelMap.get(cancelled)
        }).then(() => {
            alert(('success'))
        }) 
    }

    // for displaying verification msg after submit button clicked
    const [message, setMessage] = useState(null);
    const handleClick = () => {
        setMessage("Information updated for flight from " + origin + " to " + destination);
    };

    // For month dropdown menu
    const handleOptionClick = event => {
        const selectedOption = event.target.value;
        setMonth(selectedOption);
    };
    const options = [ // month name options for dropdown menu
        { label: "January", value: "January" },
        { label: "February", value: "February" },
        { label: "March", value: "March" },
        { label: "April", value: "April" },
        { label: "May", value: "May" },
        { label: "June", value: "June" },
        { label: "July", value: "July" },
        { label: "August", value: "August" },
        { label: "September", value: "September" },
        { label: "October", value: "October" },
        { label: "November", value: "November" },
        { label: "December", value: "December" },
    ];
    const monthMap = new Map([  // maps from month name to numerical number 1-12
        ["January", 1],
        ["February", 2],
        ["March", 3],
        ["April", 4],
        ["May", 5],
        ["June", 6],
        ["July", 7],
        ["August", 8],
        ["September", 9],
        ["October", 10],
        ["November", 11],
        ["December", 12]
    ]);
  
    // for cancellation dropdown menu
    const handleOptionClickCancel = event => {
        const selectedOption = event.target.value;
        setCancelled(selectedOption);
    };
    const optionsCancel = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
    ];
    const optionsCancelMap = new Map([  
        ["Yes", 1],
        ["No", 0]
    ]);


    return (
        <div>
            <Container>
                <br/>
                <Heading>
                    Name and Flight Details:
                </Heading>
                <br/>
                <form onSubmit={handleSubmit}>

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

                        <Input
                        placeholder='Airline ID (ex: AA)'
                        id="airline_"
                        name="airline_"
                        type="text"
                        onChange={event => setAirline(event.target.value)}
                        value={airline}
                        size='md'
                        />

                        <Input
                        placeholder='Origin Airport (ex: SFO)'
                        id="origin_"
                        name="origin_"
                        type="text"
                        onChange={event => setOrigin(event.target.value)}
                        value={origin}
                        size='md'
                        />

                        <Input
                        placeholder='Destination Airport (ex: ORD)'
                        id="destination_"
                        name="destination_"
                        type="text"
                        onChange={event => setDestination(event.target.value)}
                        value={destination}
                        size='md'
                        />

                        <Menu>
                            <MenuButton as={Button}>{month || "Select Month"}</MenuButton>
                            <MenuList>
                                {options.map(option => (
                                <MenuItem key={option.value} value={option.value} onClick={handleOptionClick}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>

                        <Input
                            placeholder='Arrival Delay Time (minutes)'
                            id="delay_"
                            name="delay_"
                            type="number"
                            onChange={event => setDelayTime(event.target.value)}
                            value={delayTime}
                            size='md'
                        />

                        <Menu>
                            <MenuButton as={Button}>{"Cancellation Status: \t" + cancelled || "Cancellation status: "}</MenuButton>
                            <MenuList>
                                {optionsCancel.map(option => (
                                <MenuItem key={option.value} value={option.value} onClick={handleOptionClickCancel}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>

                    </Stack>
                    <Button type="submit" className='add-data-submit-button' onClick={handleClick}>Submit</Button> <br />
                    {message && <p>{message}</p>}
            </form>
            </Container>

            <br />

            <Button onClick={navigateHome} marginLeft="31%">
                back
            </Button>


        </div>
      )
}

export default AddData