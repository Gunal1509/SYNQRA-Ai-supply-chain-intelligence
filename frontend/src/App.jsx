import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Counter from './Components/Counter'
import About from './Components/About'
import AiAssisstant from './Pages/AiAssisstant';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Shipments from './Pages/Shipments';
import Suppliers from './Pages/Suppliers';
import Dashboardlayout from './Layouts/Dashboardlayout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'


function App() {


  return (
    <BrowserRouter>
      <Routes>
      
      <Route element={<Dashboardlayout/>}>
          <Route path="/" element={<Dashboard  />} />
        <Route path="/Shipments" element={<Shipments />} />
        <Route path="/AiAssisstant" element={<AiAssisstant />}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Orders" element={<Orders />}/>
        <Route path="/Suppliers" element={<Suppliers />}/>
      </Route>

        

      </Routes>
    </BrowserRouter>
  )
}

export default App;
