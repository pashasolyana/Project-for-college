import {useState, useContext} from 'react'
import axios from 'axios'
import UserContext from './UserContent';
import { Navigate } from 'react-router-dom';

function Login() {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[loginErr, setLoginErr] = useState(false)
    const[redirect, setRedirect] = useState(false);

    const user = useContext(UserContext);

    function loginUser(e){
        e.preventDefault();

        const data = {email, password}
        axios.post('http://localhost:5000/login',data,{withCredentials: true})
            .then(response => {
            user.setEmail(response.data.email);
            setEmail('');
            setPassword('');
            setLoginErr(false);
            setRedirect(true)
        })
            .catch(() =>{
            setLoginErr(true)
        });
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form action = "" onSubmit = {e =>loginUser(e)}>
        {loginErr && (
            <div>WRONG LOGIN OR PASSWORD</div>
        )}
            <input type="email" placeholder = "email" value={email} onChange = {e => setEmail(e.target.value)}/><br/>
            <input type="password" placeholder = "password" value={password} onChange = {e => setPassword(e.target.value)}/><br/>
            <button type = "submit">Confirm</button>
        </form>
    )
}

export default Login;