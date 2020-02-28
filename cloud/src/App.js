import React from 'react';
import './App.css';
import Friends from './Pages/Friends';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar';
import Timeline from './Pages/Timeline';
import Login from './Pages/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
class App extends React.Component {
  constructor(){
    super()
    this.state={
      isLoggedIn: false,
      username: "",
      password: ""
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  handleLogin(){
    let request = new XMLHttpRequest()
    request.open('GET', 'http://162.246.157.219:25565/users/login')
    request.setRequestHeader("Authorization", "Basic " + btoa(this.state.username+":"+this.state.password));
    request.send()
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
              username={this.state.username} 
              password={this.state.password} 
              usernameChange={this.usernameChange}
              passwordChange={this.passwordChange}
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