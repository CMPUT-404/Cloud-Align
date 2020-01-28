import React from 'react';
import './css/Profile.css'


class Profile extends React.Component {
  render(){  
    return (
      
      <div>
        <div>
        <img id="profile_pic" src={require('../images/pepe.jpeg')} />
        <h1>Name</h1>
        <button id='add_button'>
        {/* <img id="add_button_img" src={require('../images/add_button.jpeg')} /> */}
        </button>
        </div>
        <h4>This page should display the user profile, including avator, posts from the user...</h4>
      </div>
    )

  }
}
export default Profile