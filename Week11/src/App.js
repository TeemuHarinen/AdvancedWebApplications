import './App.css'
import Header from './components/Header'
import MyContainer from './components/MyContainer'
import About from './components/About'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><MyContainer /></>}/>
        <Route path="/about" element={<><Header /><About /></>}/>
      </Routes>
    </Router>
  )
}

export default App
