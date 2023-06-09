import React, {useState} from 'react';
import { TextField, Button, Container} from '@mui/material';
import '../registration/style.css';
import authservice from '../../sevices/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from "../../context/auth.context";
import { NavLink } from 'react-router-dom';
 
 
const Login = () => {
    const authContext = useAuthContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit(event) {
        
        event.preventDefault();
        const data={
            "email": email,    
            "password": password
        }
        authservice.login(data).then((res)=>{
            setEmail('');
            setPassword('');
            toast.success("Successfully login!",{position: toast.POSITION.TOP_RIGHT});
            authContext.setUser(res.result);
            
        }).catch((error) => { toast.error(error?.response?.data?.error ?? "Somthing went wrong"); });
    }
 
    return (
        <React.Fragment>
            <Container>
            <h2 className='heading'>Login Page</h2>
            <form onSubmit={handleSubmit} action="/login" >
                <TextField
                    type="email"
                    variant='outlined'
                    color='primary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='primary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                
                <Button variant="outlined" color="primary" type="submit">Login</Button>
                <p className='mt-2'>IF You Are Not Registres So Plz First Register Your Self! <NavLink  to="/register" color="primary">Click Here</NavLink></p>
            </form>
            </Container>
        </React.Fragment>
    )
}
 
export default Login;