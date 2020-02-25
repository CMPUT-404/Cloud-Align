import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import {FormGroup, Label, Input} from 'reactstrap';
import './css/Login.css';

class Login extends React.Component {
  render(){  
    return (
      <div>
        <h2>Welcome to Cloud Align</h2>
        <h3>Login</h3>
        <FormGroup class='login-form'>
          <Label>Enter Your Email</Label>
          <Input id='emailInput' type='email' placeholder='Email'/>
          <Label>Enter Your Password</Label>
          <Input id='passwordInput' type='password' placeholder='Password'/>
          <Label>Don't have an account? Click on the register button</Label>
          <button id='registerButton'>Register</button>
          <button id='submitButton'>Login</button>
        </FormGroup>
      </div>
    )

  }
}
export default Login