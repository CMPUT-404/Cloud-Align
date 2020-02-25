import React from 'react';
import 'antd/dist/antd.css';
import './NavBar.css';
import {Link} from 'react-router-dom'
import {Nav, Navbar, NavDropdown, MenuItem} from 'react-bootstrap'

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
                <NavDropdown title="Friends Management" id="basic-nav-dropdown">
                  <NavDropdown.Item style={navStyle} href="/Friends">* FriendsRequests</NavDropdown.Item>

                  <NavDropdown.Item style={navStyle} href="/FriendsList"> * FriendsList</NavDropdown.Item>

                  <NavDropdown.Item style={navStyle} href="/Following"> * Following</NavDropdown.Item>
                </NavDropdown>
            </ul>
        </nav>
    );
}

export default NavBar
