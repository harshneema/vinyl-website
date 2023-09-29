import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact'
import About from './Components/About'
import Store from './Components/Store';
import Profile from './Components/Profile'
import Cart from './Components/Cart.js'

function App() {
  return (
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element= {<Cart />} />
        </Routes>
  );
}

export default App;

