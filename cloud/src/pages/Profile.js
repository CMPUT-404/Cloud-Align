import React from 'react';
import Basic_profile from './Models/Basic_profile';
import './css/Profile.css';

class Profile extends React.Component {




  render(){


    return (
      <div className="Profile" >


        <Basic_profile />


        <form className="form"  >
          <input type="text" placeholder="Nickname" ></input><br></br>
          <input type="text" placeholder="Email"></input><br></br>
          <input type="text" placeholder="PhoneNumber"></input><br></br>

          <button> Save Changes </button>

        </form>
        <button>

        </button>

      </div>




    )

  }
}
export default Profile
