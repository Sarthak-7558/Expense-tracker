import React from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa";
import '../styles/notransaction.css';

const Notransaction = () => {
  return (
    <div className="no-transaction-container">
      <FaFileInvoiceDollar className="no-transaction-icon" />
      <h3 className="no-transaction-title">No Transactions Yet</h3>
      <p className="no-transaction-message">Start by adding your first income or expense to see your transactions here.</p>
    </div>
  );
};

export default Notransaction;
