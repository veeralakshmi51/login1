import React from 'react';
import Passcode from './Passcode';
import Login from './Login';
import { Routes,Route } from 'react-router-dom';
import Organization from './Organization';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/passcode' element={<Passcode/>}/>
        <Route path='/organization' element={<Organization/>}/>
      </Routes>
      {/* <Login/> */}
      {/* <Passcode/> */}
    </div>
  );
}

export default App;
