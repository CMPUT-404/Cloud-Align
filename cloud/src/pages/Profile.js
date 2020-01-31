import React from 'react';

import Basic_profile from './Models/Basic_profile'

import Test from './Models/test'
import './css/Profile.css' 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import data from './Data/Profile_data'


class Profile extends React.Component {
  

  

  render(){ 
    
   
    return (
<<<<<<< HEAD
      
      <div>
        <div>
        <img id="profile_pic" src={require('../Images/pepe.jpeg')} />
        <h1>Name</h1>
        <button id='add_button'>
        {/* <img id="add_button_img" src={require('../images/add_button.jpeg')} /> */}
=======
      <div className="Profile" >

       
        <Basic_profile />
        
        
        <form className="form"  >
          <input type="text" placeholder="Nickname" ></input><br></br>
          <input type="text" placeholder="Email"></input><br></br>
          <input type="text" placeholder="PhoneNumber"></input><br></br>
          
          <button> Save Changes </button>

        </form>
        <button>
        
>>>>>>> frontend-dev-joe
        </button>
        
      </div>
      
        
     
      
    )

  }
}
export default Profile