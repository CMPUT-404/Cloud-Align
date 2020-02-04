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



class Profile extends React.Component {
  

  

  render(){ 
    

    // GET
    // var request = new XMLHttpRequest()
    // request.open('GET','http://162.246.157.219:25565/users')
    // request.send()
    // var temp = null
    // request.onload = ()=>{
    //   temp = JSON.parse(request.response)
    //   alert(temp[0].url)
    // }

    //POST 
    // request.open('POST','http://162.246.157.219:25565/users/')
    // request.setRequestHeader("Authorization", "Basic " + btoa("admin:123456"));
    // request.setRequestHeader("Content-Type", "application/json")
    // request.onreadystatechange = function () {
    //   alert(request.responseText)
    //   if (request.readyState === 4 && request.status === 200) {
    //       var json = JSON.parse(request.responseText);
    //       alert(JSON.stringify(json));
    //   }
    // };
    // request.send('{"username":"AtestCow","password":"123456"}')

      

  





    return (
      <div className="Profile" >

       
        <Basic_profile />
        
        
        <form className="form"  >
          <input type="text" placeholder="Nickname" ></input><br></br>
          <input type="text" placeholder="Email"></input><br></br>
          <input type="text" placeholder="PhoneNumber"></input><br></br>
          
          <button> temp.users </button>

        </form>
        <button>
        
        </button>
        
      </div>
      
        
     
      
    )

  }
}
export default Profile