import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Center, Heading, Container, Stack, Input, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import '../App.css'

import axios from "axios";

const UpdateName = () => {
    
    // variables for this page
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newFirstName, setNewFirstName] = useState('');

    // navigate home
    let navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    // for displaying verification msg after user update button clicked
    const [message, setMessage] = useState(null);
    
    //action for update name button
    const handleClickUpdate = (event) => {
        console.log('handleSubmit run');
        event.preventDefault();  // prevent page refresh

        axios.put('http://localhost:3002/api/update-name', {
            NewFirstName: newFirstName,
            FirstName: firstName,
            LastName: lastName
        }).then(() => {
            console.log('successful update')
        })   
        setMessage("Name changed from " + firstName + " to " + newFirstName + "!");
    };

    // action for delete button
    const handleClickDelete = (event) => {
        console.log('handleSubmit run');
        event.preventDefault();
        axios.delete(`http://localhost:3002/api/delete-user/${firstName}/${lastName}`)
        .then(() => {
        window.location.reload();
        })
        .catch((error) => {
        console.error(error);
        });
        setMessage("Deleted user information for: " + firstName + " " + lastName);
    };

    return (
        <div>
            <Container>
                <br/>
                <Heading>
                    Enter Details:
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

                        <Input
                        placeholder='New First Name'
                        id="new_first_name_"
                        name="new_first_name_"
                        type="text"
                        onChange={event => setNewFirstName(event.target.value)}
                        value={newFirstName}
                        size='md'
                        />

                    </Stack>

                    <br />
                    <Button type="submit" className='submit-button' onClick={handleClickUpdate}>Update Name</Button> <br />
                    <Button type="submit" className='submit-button-delete' onClick={handleClickDelete}>Delete User</Button> <br />
                    {message && <p>{message}</p>}

            </form>
            </Container>


            <Button onClick={navigateHome} marginLeft="37.5%" marginTop="2%">
                back
            </Button>


        </div>
      )
}

export default UpdateName