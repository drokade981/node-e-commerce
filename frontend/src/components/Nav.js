import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <ul className="nav-ul">
                <li><Link to="/products">Product</Link></li>
                <li><Link to="/add-product">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    )
}

export default Nav;