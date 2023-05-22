import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axiosInstance from '../config/axiosConfig';
import { setToken, getToken } from '../config/tokenManager';
import {currentUser } from '../model/currentUserData';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth', { email, password });
  
      if (response.data.success) {
        const token = response.data.data.genToken;
        setToken(token);
       
        console.log(getToken());
        var userData = response.data.data;
        currentUser.userId = userData.id;
        currentUser.department = userData.department;
        currentUser.role = userData.role;
        currentUser.email = userData.email;
        currentUser.username = userData.first_name
        console.log(currentUser)
        navigate('/home');
      } else {
        setLoginError(true);
  
      
      }
    } catch (err) {
      console.log(err);
      setLoginError(true);
  
     
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  };
  

  const showPasswordHandler = () => setShowPassword((show) => !show);

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome back!</h1>
      <form className="login-form" onSubmit={submitHandler}>
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: <EmailOutlined className="icon" />,
          }}
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <LockOutlined className="icon" />,
            endAdornment: (
              <IconButton aria-label="toggle password visibility" onClick={showPasswordHandler} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {loginError && (
          <p className="login-error">Incorrect email or password. Please try again.</p>
        )}
      </form>
    </div>
  );
}

export default Login;
