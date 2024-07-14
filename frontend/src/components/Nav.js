import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    return (
        <div>
            <ul className="nav-ul">
                <li><Link to="/products">Product</Link></li>
                <li><Link to="/add-product">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>{auth ? <Link to="/logout">Logout</Link> : <Link to="/register">Signup</Link>} </li>
            </ul>
        </div>
    )
}

export default Nav;