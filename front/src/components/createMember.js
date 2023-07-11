import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import { EmailOutlined, PersonOutline, PhoneOutlined, LockOutlined, BusinessOutlined, Visibility, DeleteOutline, EventOutlined, AccountBoxOutlined, UpdateOutlined } from '@mui/icons-material';
import '../styles/addmember.css';
import axiosInstance from '../config/axiosConfig';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function AddMember() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("1234");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openErr, setOpenErr] = useState(false)
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
      setOpenErr(false);
    };
    const handleAddMember = () => {
        const newMember = {
          first_name: firstName,
          last_name: lastName,
          phone_num: phoneNumber,
          email: email,
          password: password,
          department: department,
          role: role,
        };
        axiosInstance.post("/employee", newMember)
          .then((response) => {   
              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setPhoneNumber('');
              setDepartment('');
              setRole('');
              setOpen(true);
          })
          .catch(error => {
            if (error.response) {
              setErrorMessage(error.response.data.message);
            } else {
              setErrorMessage("Employee profile creation failed");
            }
            setOpenErr(true);
          });
      };
      

    return (
        <div className="addMember">
  <p>Add Members</p>
  <TextField
    type="text"
    label="First Name"
    variant="outlined"
    className="input"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    InputProps={{
      startAdornment: <PersonOutline className="icon" />,
    }}
  />
  <TextField
    type="text"
    label="Last Name"
    variant="outlined"
    className="input"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    InputProps={{
      startAdornment: <PersonOutline className="icon" />,
    }}
  />
  <TextField
    type="tel"
    label="Phone Number"
    variant="outlined"
    className="input"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    InputProps={{
      startAdornment: <PhoneOutlined className="icon" />,
    }}
  />
  <TextField
    type="email"
    label="Email"
    variant="outlined"
    className="input"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    InputProps={{
      startAdornment: <EmailOutlined className="icon" />,
    }}
  />
  <TextField
    type="password"
    label="Password"
    variant="outlined"
    className="input"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    InputProps={{
      startAdornment: <LockOutlined className="icon" />,
      // endAdornment: <Visibility className="icon"/>
    }}
  />
  <TextField
    type="text"
    label="Department"
    variant="outlined"
    className="input"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
    InputProps={{
      startAdornment: <BusinessOutlined className="icon" />,
    }}
  />
  <TextField
    type="text"
    label="Role"
    variant="outlined"
    className="input"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    InputProps={{
      startAdornment: <AccountBoxOutlined className="icon" />,
    }}
  />
  <Button
    variant="contained"
    size="large"
    className="addButton"
    onClick={handleAddMember}
  >
    Add Member
  </Button>
  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Account created success!
        </Alert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
</div>

    );
}