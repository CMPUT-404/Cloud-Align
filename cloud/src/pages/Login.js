import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {FormGroup, Label, Input} from 'reactstrap';
import './css/Login.css';

class Login extends React.Component {

  render(){  

    console.log(this.props)

    return (
      <div>
        <h2>Welcome to Cloud Align</h2>
        <h3>Login</h3>
        <FormGroup className='login-form'>
          <Label>Enter Your Email</Label>
          <Input id='textInput' type='text' placeholder='Username' value={this.props.username} onChange={this.props.usernameChange}/>
          <Label>Enter Your Password</Label>
          <Input id='passwordInput' type='password' placeholder='Password' value={this.props.password} onChange={this.props.passwordChange}/>
          <Label>Don't have an account? Click on the register button</Label>
          <button id='registerButton'>Register</button>
          <button id='submitButton' onClick={this.props.handleLogin}>Login</button>
        </FormGroup>
      </div>
    )
  }
}
export default Login