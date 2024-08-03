import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/register');
    }
    return (
        <div>
            <img className="logo" src="./logo.png" alt="logo" />
            {auth ? 
                <ul className="nav-ul">
                    <li><Link to="/products">Product</Link></li>
                    <li><Link to="/add-product">Add Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout } to="/signup">Logout</Link></li>
                </ul>                
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/register">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                </ul>
            }            
        </div>
    )
}

export default Nav;