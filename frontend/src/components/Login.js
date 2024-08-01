import React, {useState} from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const lgoingUrl = config.apiBaseUrl+'/login';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch(lgoingUrl, 
        {
            method : 'post',
            body : JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json(); 
        console.log(result);
               
        if (result.user.name) {
            console.log('user');
            
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } else {
            alert('Please enter correct credential');
        }
    }
    return (
        <div className="login">
            <input type="text" className="inputBox" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            <input type="password" className="inputBox" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            <button className="appButton" type="button" onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login
