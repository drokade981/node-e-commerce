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
            <ul className="nav-ul">
                <li><Link to="/products">Product</Link></li>
                <li><Link to="/add-product">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>
                    {auth ? <Link onClick={logout } to="/signup">Logout</Link> : 
                    <>
                    <Link to="/register">Signup</Link>
                    <Link to="/login">Login</Link>
                    </> }
                    
                </li>
            </ul>
        </div>
    )
}

export default Nav;