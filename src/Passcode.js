// import React, { useState, useRef} from 'react';
// import image from './image1.png';
// import './Passcode.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Passcode = () => {
//   const [passcode, setPasscode] = useState(new Array(6).fill(''));
//   const [passcodeError, setPasscodeError] = useState('');
//   const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
//   const [jwt, setJwt] = useState(null);
//   const [secretKey, setSecretKey] = useState(null);
//   const navigate = useNavigate();


//   const handleChange=(element, index)=>{
//     if (isNaN(element.value)) return false;
//     setPasscode([...passcode.map((d, idx)=>(idx === index ? element.value : d))]);

//     if (index < 5 && element.value !== '') {
//       inputRefs.current[index + 1].current.focus();
//     }
//   };

//   const handleLogin = async ()=>{
//     if (passcode.some((value) => value === '')) {
//       setPasscodeError('Please Enter Passcode');
//     } else {
//       try {
//         const response = await axios.post('http://47.32.254.89:7000/api/user/verify', {
//           secretKey:secretKey,
//           jwt:jwt
//         });

//         console.log('response:', response);
//         console.log('response status:', response.status);
//         console.log('response data:', response.data);
//         console.log('JWT', jwt);
//         console.log("secretKey", secretKey)
//         if (response.data.message.code==='MHC - 0200') {
//           const { secretKey, jwt } = response.data;
//  console.log(jwt)
//           if (secretKey && jwt) {
//             setPasscodeError('');
//             setSecretKey(secretKey);
//             setJwt(jwt);
//             navigate('/organization');
//           } else {
//             setPasscodeError('Invalid Secret Key or JWT');
//           }
//         } else {
//           setPasscodeError('Invalid Passcode');
//         }
//       } catch (error) {
//         console.error('Error during verification:', error);
//         setPasscodeError('Error during verification');
//       }
//     }
//   };

//   return (
//     <div className='container'>
//       <img src={image} alt='' className='image-container' style={{ width: '500px', height: '500px' }} />
//       <label style={{fontFamily:'cursive',fontWeight:'bolder',fontSize:'20px',color:'blue',marginTop:'20px'}}>Passcode:</label>
//       <div style={{ display: 'block'}}>
//       {passcode.map((item, index) => (
//         <input
//           className='passcode-field'
//           type='text'
//           name='passcode'
//           maxLength='1'
//           key={index}
//           value={item}
//           onChange={(e)=>handleChange(e.target, index)}
//           onFocus={(e)=>e.target.select()}
//           ref={inputRefs.current[index]}
//           style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', padding: '5px', margin: '5px',marginTop:'10px' }}
//          />
//       ))}
//       </div>
//       {passcodeError && <div className='passcodeerror' style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{passcodeError}</div>}
//       <button type='submit' className='login' onClick={handleLogin} style={{backgroundColor:'green',borderRadius:'10px',marginTop:'10px'}}>
//         Login
//       </button>
//       <a href='/forgot-password' style={{textDecoration:'none',fontSize:'15px',marginTop:'10px'}}>Forgot Password</a>
//     </div>
//   );
// };

// export default Passcode;




import React, { useState, useRef, useEffect } from 'react';
import image from './image1.png';
import './Passcode.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Passcode = () => {
  const [passcode, setPasscode] = useState(new Array(6).fill(''));
  const [passcodeError, setPasscodeError] = useState('');
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const [jwt, setJwt] = useState(null);
  const [secretKey, setSecretKey] = useState(''); // Initialize secretKey state
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Access JWT from location state
    const jwtFromLogin = location.state?.jwt;
    if (jwtFromLogin) {
      setJwt(jwtFromLogin);
    }
  }, [location]);

  // Ensure that the secretKey state is updated correctly when the user enters the secret key
  const handleSecretKeyChange = (e) => {
    setSecretKey(e.target.value);
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setPasscode([...passcode.map((d, idx) => (idx === index ? element.value : d))]);

    if (index < 5 && element.value !== '') {
inputRefs.current[index+1].current.focus()
    }
  };

  const handleLogin = async () => {
    if (passcode.some((value) => value === '')) {
      setPasscodeError('Please Enter Passcode');
    } else {
      try {
        // Set the secretKey from the state
        const secretKeyFromState = secretKey;

        console.log('Current secretKey:', secretKeyFromState);

        const response = await axios.post('http://47.32.254.89:7000/api/user/verify', {
          jwt: jwt,
          secretKey: secretKeyFromState, 
        });

        console.log('response:', response);
        console.log('response status:', response.status);
        console.log('response data:', response.data);
        console.log('JWT', jwt);
        console.log('SecretKey', secretKeyFromState); 

        if (response.data.message.code === 'MHC - 0200') {
          const { secretKey, jwt } = response.data;
          console.log(jwt);

          if (secretKey && jwt) {
            setPasscodeError('');
            setSecretKey(secretKey);
            setJwt(jwt);
            navigate('/organization');
          } else {
            setPasscodeError('Invalid Secret Key or JWT');
          }
        } else {
          setPasscodeError('Invalid Passcode');
        }
      } catch (error) {
        console.error('Error during verification:', error);
        setPasscodeError('Error during verification');
      }
    }
  };

  return (
    <div className='container'>
      <img src={image} alt='' className='image-container' style={{ width: '500px', height: '500px' }} />
      <label style={{ fontFamily: 'cursive', fontWeight: 'bolder', fontSize: '20px', color: 'blue', marginTop: '20px' }}>Passcode:</label>
      <div style={{ display: 'block' }}>
        {passcode.map((item, index) => (
          <input
            className='passcode-field'
            type='text'
            name='passcode'
            maxLength='1'
            key={index}
            value={item}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            ref={inputRefs.current[index]}
            style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', padding: '5px', margin: '5px', marginTop: '10px' }}
          />
        ))}
      </div>
      {passcodeError && <div className='passcodeerror' style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{passcodeError}</div>}
      {/* Input field for entering the secret key */}
      <input
        type='text'
        value={secretKey}
        onChange={handleSecretKeyChange}
        placeholder='Enter Secret Key'
        style={{ marginTop: '10px', borderRadius: '10px', padding: '5px' }}
      />
      <button type='submit' className='login' onClick={handleLogin} style={{ backgroundColor: 'green', borderRadius: '10px', marginTop: '10px' }}>
        Login
      </button>
      <a href='/forgot-password' style={{ textDecoration: 'none', fontSize: '15px', marginTop: '10px' }}>Forgot Password</a>
    </div>
  );
};

export default Passcode;


