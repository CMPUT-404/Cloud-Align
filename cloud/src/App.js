import React from 'react';
import './App.css';
import Friends from './Pages/Friends';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar';
import Timeline from './Pages/Timeline';
import Login from './Pages/Login';
import Register from './Pages/Register';
import  { Link } from 'react-router-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
class App extends React.Component {
  constructor(){
    super()
    this.state={
      hasAccount: true,
      isLoggedIn: false,
      username: "",
      password: ""
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleLogin(){
    let request = new XMLHttpRequest()
    request.open('GET', 'http://162.246.157.219:25565/users/login')
    request.setRequestHeader("Authorization", "Basic " + btoa(this.state.username+":"+this.state.password));
    request.send()

    request.onload = () => {
      if (request.status != 200) { // analyze HTTP status of the response
        return (
          //TODO: Render a page that reprompts the user to type in the user name and password
          <Login/>
        )
      } else { // show the result
        var jsonResponse = JSON.parse(request.responseText);
        this.setState({userObject: jsonResponse});
        console.log(this.state.userObject);
        this.setState({isLoggedIn:true});
      }
    };
    
  }

  register(){
    alert("register an account")
  }

  usernameChange(e){
    this.setState({username: e.target.value})
  }


  passwordChange(e){
    this.setState({password: e.target.value})
  }

  render(){  
    if (this.state.isLoggedIn===false){
      return (
        <Login handleLogin={this.handleLogin} 
              register={this.register}
              username={this.state.username} 
              password={this.state.password} 
              usernameChange={this.usernameChange}
              passwordChange={this.passwordChange}
        />
      )
    } if (this.state.hasAccount===false){
      return(
        <Register
          register = {this.register}
          username = {this.state.username}
          password = {this.state.password}
          usernameChange = {this.usernameChange}
          passwordChange = {this.passwordChange}
        />
      )
    } else {
      return(
        <Router>
          <NavBar />
          <Switch>
            <Route path="/profile" component={Profile}/>
            <Route path="/friends" component={Friends}/>
            <Route exact path="/timeline" component={Timeline}/>
          </Switch>
        </Router>
      );
    }
  }
}
export default App