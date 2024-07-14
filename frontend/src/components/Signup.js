import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import config from '../config';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    })

    const url = `${config.apiBaseUrl}/register`;

    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch(url, {
            method : 'post',
            body : JSON.stringify({name, email, password}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        console.log(result);
        if (result) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        }
        
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="inputBox" placeholder="enter name" />
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} className="inputBox" placeholder="enter email" />
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="inputBox" placeholder="enter password" />
            <button onClick={collectData} className="appButton">Signup</button>
        </div>
    )
}

export default Signup;