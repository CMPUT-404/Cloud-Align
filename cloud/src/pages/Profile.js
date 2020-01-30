import React from 'react';

import Basic_profile from './Models/Basic_profile'

import Test from './Models/test'
import './css/Profile.css'


class Profile extends React.Component {
  

  render(){ 
    var TTest = JSON.parse(`

    {
        "id": 12121212121212,
        "shadow": true,
        "cow": "moo",
        "cats":[
            {
                "noise":"meo"
            }
        ]
    
    }
    
    `)
    
    return (
      <div className="Profile" >

       
        {/* <Basic_profile /> */}
        

        <form id="form" style={{top: "800px"}}>
          <input type="text" placeholder="name" ></input>
          <input type="text" placeholder="Email"></input>
          {TTest.id}
        </form>
        
      </div>
      
        
     
      
    )

  }
}
export default Profile