import React, { useState,useEffect } from 'react';
import usericon from './user.png';
import passwordicon from './password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import organicon from './teamwork.png'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState('');
  const [organization,setOrganization]=useState("")
  const navigate = useNavigate();
  const organizationOptions = [
    "ELONNATIVESYSTEM",
    "Organization-1", 
  "Organization-2", 
  "Organization-3", 
  "Organization-4", 
  "Organization-5"];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleLogin();
        
      }
    };
   
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value === '') {
      setDetails('Username is required');
    }  else {
      setDetails('');
    }
  };

  const handleClick = (e) => {
    setPassword(e.target.value);
    if (e.target.value === '') {
      setMessage('Please Enter Password');

    } else {
      setMessage('');
    }
  };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Username and Password is required.');
      return;
    }

    try {
      const result = await axios.post('http://47.32.254.89:7000//api/user/signin', {
        username,
        password,
      });

      if (result.data.message === 'MHC-0200') {
        localStorage.setItem('AuthID', result.data.data._id);
        if (result.data.data.usertype === 'Admin') {
          navigate('/admin');
        } else if (result.data.data.usertype === 'Staff') {
          localStorage.setItem('Name', result.data.data.Name);
          localStorage.setItem('Username', result.data.data.username);
          navigate('/stafflogin');
        } else {
          alert('Login failed. Please check your credentials...');
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  
  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };
 
  return (
    <div className="container">
      <title>Staff Leave Management System</title>
      <div className="header">
        <div className="text">Login Panel</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={usericon} alt="user-img" />
          <input type="text" placeholder="Enter UserName" value={username} onChange={handleChange} />
        </div>
       <p>{details}</p>
        <div className="input">
          <img src={passwordicon} alt="lock-img" />
          <input type="password" placeholder="Enter Password" value={password} onChange={handleClick} />
        </div>
         <p>{message}</p>
      </div><br></br>
      <div className="input">
          <img src={organicon} alt="organ-img" />
          <select value={organization} onChange={handleOrganizationChange}>
    {organizationOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
          {/* <input type="text"  value={organization} readOnly /> */}
          {/* <select>
            <option type="type-1">Organization-1</option>
            <option type="type-1">Organization-2</option>
            <option type="type-1">Organization-3</option>
            <option type="type-1">Organization-4</option>
            <option type="type-1">Organization-5</option>
          </select> */}
        </div>
      <div className="forgot-password">
        Forgot Password <Link to="/forgotpassword">Click Here!</Link>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>
          <Link to="/login"></Link>Login
        </button>
      </div>
    </div>
  );
};

export default Login;
