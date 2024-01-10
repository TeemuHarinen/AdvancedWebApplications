import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MyContainer from './components/MyContainer';
import About from './components/About';
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><MyContainer /></>}/>
        <Route path="/about" element={<><Header /><About /></>}/>
      </Routes>
    </Router>
  );
}

export default App;
