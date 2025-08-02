import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'; // Make sure this is imported
import'../styles/getquote.css';

const Navbar = () => {

  const [quote, setquote] = useState("");
  const [ismodalopen, setismodalopen] = useState(false);
  const navigate=useNavigate();

  const fetchquote=async()=>{
    try {
      const response=await fetch('https://quotes-api-self.vercel.app/quote');
      const data=await response.json();
      setquote(data.quote);
      setismodalopen(true);
      console.log(data);
    } catch (error) {
      console.log('error');
      setquote("Failed to fetch quote");
      setismodalopen(true);
    }
  }

  const handleReset=()=>{
    localStorage.clear();
    navigate('/');
  }


  return (
    <>
    <nav className="navbar">
      <div className="logo">Expense Tracker</div>
      <ul className="nav-links">
        <li><Link to="/dashboard" className="nav-link">📶 Dashboard</Link></li>
        <li><Link to="/transaction" className="nav-link">💵 Transaction</Link></li>
        <li><Link to="/report" className="nav-link">📝 Report</Link></li>
        <li className="nav-link" onClick={fetchquote} >💡Get Quote</li>
        <div className='nav-link reset-button' onClick={handleReset}>🔄 Reset</div>
      </ul>

    </nav>

    {ismodalopen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{quote}</p>
            <button className="close-button" onClick={() => setismodalopen(false)}>Close</button>
          </div>
        </div>
    )}

   

    
  </>)
}

export default Navbar
