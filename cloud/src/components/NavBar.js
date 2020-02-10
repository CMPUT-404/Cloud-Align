import React from 'react';
import 'antd/dist/antd.css';
import './NavBar.css';
import {Link} from 'react-router-dom'


function NavBar(){

    const navStyle = {
        color:'black'
    };

    return(
        <nav>
            <img id="logo" align="left" src={require('../Images/cloudLogo.jpg')} />
            <ul className='nav-links'>
                <Link style={navStyle} to='/Profile'><li>Profile</li></Link>
                <Link style={navStyle} to='/Timeline'><li>Timeline</li></Link>
                <Link style={navStyle} to='/Friends'><li>Friends</li></Link>
            </ul>
        </nav>
    );
}

export default NavBar