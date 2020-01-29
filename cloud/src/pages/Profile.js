import React from 'react';

import Basic_profile from './Models/Basic_profile'

import Test from './Models/test'


class Profile extends React.Component {
  
  
  render(){ 
    const junk = [1,2,3,4]
    return (
      <div className="Profile">

        
        <Basic_profile id="1"/>
        {/* <div style={{position:"relative", top:"500px"}}>
        <Basic_profile id="1"/>
        </div> */}
      </div>
      
        
     
      
    )

  }
}
export default Profile