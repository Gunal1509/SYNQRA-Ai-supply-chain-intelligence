import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Welcome from './Components/Welcome'
import Counter from './Components/Counter'
import Dashboard from './Components/Dashboard'
import About from './Components/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'


function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Welcome  name={'Gunal'}/>} />

        <Route path="/about" element={<About />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
