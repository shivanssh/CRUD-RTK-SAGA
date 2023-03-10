import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddUpdateUser from './pages/AddUpdateUser/AddUpdateUser';
import Home from './pages/Home/Home';
import FourZeroFour from './pages/FourOhFour/FourOhFour';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addUser' element={<AddUpdateUser />} />
        <Route path='updateUser/:id' element={<AddUpdateUser />} />
        <Route path='*' element={<FourZeroFour />} />
      </Routes>
    </div>
  );
};

export default App;
