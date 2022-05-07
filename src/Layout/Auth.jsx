import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Views/Auth/Login';
import Register from '../Views/Auth/Register';

const Auth = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </>
  );
};

export default Auth;
