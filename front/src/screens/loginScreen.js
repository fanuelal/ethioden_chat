import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff  } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    
    navigate('/home')
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
          className='login-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: <EmailOutlined className='icon' />,
          }}
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <TextField
          type={showPassword ? "text": "password" }
          label="Password"
          variant="outlined"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <LockOutlined className={"icon"} />,
            endAdornment:                 <IconButton
            aria-label="toggle password visibility"
            onClick={showPasswordHandler}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          }}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;