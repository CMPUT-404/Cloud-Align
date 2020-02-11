import React from 'react';
import Basic_profile from './Models/Basic_profile';
import './css/Profile.css';


class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    
      userdata : 'http://162.246.157.219:25565/users/2/'
    }
  }

  

  save_change(tempdata){
    

  var data = {};
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  if (email != ''){data["email"] = email}
  if (name!=''){data["username"] = name}
 
  data = JSON.stringify(data);
  

  var putreq = new XMLHttpRequest(); 
  putreq.open('PUT',tempdata.userdata,false);
  
  putreq.setRequestHeader('Authorization', "Basic " + btoa('admin:123456'));
  putreq.setRequestHeader('Content-Type', 'application/json');
  
  putreq.onreadystatechange = function () {
     
      if (putreq.status != 200){
        var json = JSON.parse(putreq.responseText);
        alert(JSON.stringify(json));
      }
      
    };

 

  putreq.send(data);

   
   

    
  }


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

        
        <form className="form"  onSubmit={ ()=>this.save_change(this.state)} id="changes">
          <input type="text" id="name" placeholder="Name" ></input><br></br>
          <input type="text" id="email" placeholder="Email"></input><br></br>
          <input type="text" placeholder="PhoneNumber"></input><br></br>
          
          <button type="submit"> 
          Save changes
          </button>

        </form>
       

      </div>

      



    )

  }

}
export default Profile
