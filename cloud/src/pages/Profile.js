import React from 'react';
import Basic_profile from './Models/Basic_profile';
import './css/Profile.css';
import CardContent from '../Components/CardContent';
import Edit from './Models/Edit';





// import {Route,Link,BrowserRouter as Router} from 'react-router-dom';



class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      Props: props,
      userdata : 'http://162.246.157.219:25565/users/fc89aa45-ce71-43fa-b111-84e1ddecb704/',
      path: "/Timeline",
      postComponents : [],
      edit: false,
      go_edit: ()=>{
        this.setState({edit:true})
      }



    }
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

    if (this.state.edit == false){
     

    let request = new XMLHttpRequest()
    request.open('GET', 'http://162.246.157.219:25565/posts/')
    request.send()
    request.onload = () => {
      let posts = JSON.parse(request.response)
      var tempPostList = [] 
      for(let i=0;i<posts.length;i++){
        var eachPost = <CardContent post={posts[i]} />
        tempPostList.push(eachPost)
      }
      this.setState({postComponents: tempPostList})
    }

    return (
      
      
      <div className="Profile" >

        
        <div id="B">
        <Basic_profile edit={this.state.go_edit} url={this.state.userdata} />
        </div>
          
        
        

        

        <div id="posts">
            {this.state.postComponents}ls
          </div>

        
        

       
        
        
       
       
    
      </div>
    


    )
    }
    else{
      
      return(
        <div id="B">
        <Basic_profile url={this.state.userdata}/>
        
        <Edit url={this.state.userdata}/>
        </div>
      )
    }

  }

}
export default Profile
