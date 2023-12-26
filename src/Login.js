import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from './photo.png';
import axios from 'axios';
import './Login.css';
import HashLoader from 'react-spinners/HashLoader'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [organizationError, setOrganizationError] = useState('');
const [loading,setLoading]=useState(false)

const navigate=useNavigate();
useEffect(()=>{
  setLoading(true)
  setTimeout(()=>{
 setLoading(false)
  },1000)
},[])
  useEffect(() => {
    axios.get('http://47.32.254.89:7000/api/org/getAll')
      .then((response) => {
        setOrganizationOptions(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogin = async () => {
    setUsernameError('');
    setPasswordError('');
    setOrganizationError('');

    if (!username) {
      setUsernameError("Please Enter Your Username");
    }

    if (!password) {
      setPasswordError("Please Enter Your Password");
    }

    if (!organization) {
      setOrganizationError("Please Select Your Organization");
    }

    // if (!username || !password || !organization) {
    //   return;
    // }

    try {
      const response = await axios.post('http://47.32.254.89:7000/api/user/signin', {
        username,
        password,
        organization,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message.code === 'MHC - 0200') {
        const data = response.data;
        console.log(data);
        setMessage({
          text: data.message.description,
          color: 'green',
        });
        // navigate('/passcode')
        navigate('/passcode', { state: { jwt: response.data.data.jwt.jwtToken } });
        console.log("loginJWT", response.data.data.jwt.jwtToken);
      } else {
        console.error(response.statusText);
        setMessage({
          text: "An error occurred during login.",
          color: 'red',
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: "An error occurred during login.",
        color: 'red',
      });
    }
  };

  return (
    <Container fluid>
      {loading ? <HashLoader
  color="blue"
  loading
  size={80}
      style={{textAlign:'center'}}/>:
      <Row>
        <Col md={6} xs={12} className="image-container">
          <img src={image} alt="Login" className="img-fluid" style={{ height: '100vh' }} />
        </Col>
        <Col md={6} xs={12} className="form-container">
          <h2 style={{color:'grey'}}>Login to Your Account!</h2>
          <Form>
            <FormGroup>
              <Label for="username">Username <span style={{color:'red'}}>*</span></Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setUsernameError(''); }}
                placeholder="Enter Username"
                required
                style={{ width: '80%'}}
              />
              {usernameError && <div className="usernameerror" style={{ color: 'red' }}>{usernameError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password <span style={{color:'red'}}>*</span></Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                placeholder="Enter Password"
                required
                style={{ width: '80%' }}
              />
              {passwordError && <div className="passworderror" style={{ color: 'red' }}>{passwordError}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="organization">Organization <span style={{color:'red'}}>*</span></Label>
              <Input
                type="select"
                id="organization"
                value={organization}
                onChange={(e) => { setOrganization(e.target.value); setOrganizationError(''); }}
                style={{ width: '80%' }}
              >
                <option value="" disabled>Select Organization</option>
                {organizationOptions.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.organizationdetails && org.organizationdetails[0] && org.organizationdetails[0].name
                      ? org.organizationdetails[0].name
                      : "No Name"}
                  </option>
                ))}
              </Input>
              {organizationError && <div className="organizationerror" style={{ color: 'red' }}>{organizationError}</div>}
            </FormGroup>
            <FormGroup>
              <Input type='checkbox'></Input>{''}<span style={{ color: 'black', marginLeft: '5px' }}>Remember Me!</span>
              <a href='/forgot-password' style={{marginLeft:'100px'}}>Forgot Password?</a>
            </FormGroup>
            <Button color="success" onClick={handleLogin} style={{margin:'10px'}}>
              Login
            </Button>
            {message && <div className="message" >{message.text}</div>}
          </Form>
         

        </Col>
      </Row>
}
    </Container>
    
  );
};

export default Login;
