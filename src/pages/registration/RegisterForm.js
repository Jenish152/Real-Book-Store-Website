import React, {useState} from 'react';
import { TextField, Button, Container, Stack,FormControl,Select , InputLabel, MenuItem } from '@mui/material';
import './style.css';
import authservice from '../../sevices/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
 
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    function handleSubmit(event) {
        
        event.preventDefault();
        const data={
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "roleId": role,
            "password": password
        }
        authservice.create(data).then((res)=>{
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setRole('');
            
            toast.success("Successfully registred!",{position: toast.POSITION.TOP_RIGHT});
            
        }).catch((error) => { toast.error(error?.response?.data?.error ?? "Somthing went wrong"); });
    }
 
    return (
        <React.Fragment>
            <Container>
            <h2 className='heading'>Register Form</h2>
            <form onSubmit={handleSubmit} action="/login" >
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <FormControl color='secondary' variant='outlined' sx={{mb: 4}} required fullWidth>
                         <InputLabel id="demo-simple-select-label">Role</InputLabel>   
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant='outlined'
                                    value={role}
                                    label="role"
                                    
                                    onChange={e=> setRole(e.target.value)}
                                >
                                    <MenuItem value={3}>Buyer</MenuItem>
                                    <MenuItem value={2}>Seller</MenuItem>
                                </Select>
                </FormControl>
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            </Container>
        </React.Fragment>
    )
}
 
export default RegisterForm;