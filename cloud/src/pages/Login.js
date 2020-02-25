import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { FacebookLoginButton } from 'react-social-login-buttons';
import './css/Login.css';

class Login extends React.Component {
  render(){  
    return (
      <div>
        <h2>Welcome to Cloud Align</h2>
        <h3>Login</h3>
        <FormGroup class='login-form'>
          <Label id='emailLabel'>Enter Your Email</Label>
          <Input id='emailInput' type='email' placeholder='Email'/>
          <Label id='passwordLabel'>Enter Your Password</Label>
          <Input id='passwordInput' type='password' placeholder='Password'/>
          <button id='submitButton'>login</button>
        </FormGroup>
      </div>
    )

  }
}
export default Login