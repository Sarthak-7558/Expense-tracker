import React from 'react'
import Dashboard from "./Pages/Dashboard"
import Report from "./Pages/Report"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Transaction from './Pages/Transaction'
import Navbar from 'Components/Navbar'
import Notfound from './Pages/Notfound'
import AddTransaction from './Pages/AddTransaction'


const App = () => {
  return (
    <>
      <BrowserRouter>
      
       <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/report" element={<Report/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/addtransaction" element={<AddTransaction/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
      
      </BrowserRouter>
      </>
     
   
  )
}

export default App
