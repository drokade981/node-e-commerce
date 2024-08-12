import React, {useState, useEffect} from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const logingUrl = config.apiBaseUrl+'/api/login';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch(logingUrl, 
        {
            method : 'post',
            body : JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json(); 
               
        if (result.status) {
            localStorage.setItem('user', JSON.stringify(result.data.user));
            localStorage.setItem('token', JSON.stringify(result.data.token));
            navigate('/');
        } else {
            alert('Please enter correct credential');
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            <input type="password" className="inputBox" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            <button className="appButton" type="button" onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login
