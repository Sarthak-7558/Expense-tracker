import React, { useEffect, useState } from 'react';
import '../styles/transaction.css';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
  const navigate = useNavigate();
  const [transaction, settransaction] = useState([]);

  const handleEdit = (index) => {
    const edittransaction = transaction[index]; // ✅ Fixed variable name
    navigate('/addtransaction', {
      state: { transaction: { ...edittransaction, index } },
    });
  };

  const handleDelete = (index) => {
    const updatedtransaction = transaction.filter((data, i) => i !== index);
    settransaction(updatedtransaction);
    localStorage.setItem('transactions', JSON.stringify(updatedtransaction));
  };

  useEffect(() => {
    const existingtransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    settransaction(existingtransactions);
  }, []);

  const Categoryemojis = {
    Salary: '💼',
    Groceries: '🛒',
    Dining: '🍽️',
    Transport: '🚗',
    Entertainment: '🎬',
    Others: '📦',
  };

  return (
    <div className="transactions-container">
      <h2>All Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((tx, index) => (
            <tr key={index}>
              <td>{Categoryemojis[tx.category]} {tx.category}</td>
              <td>{tx.description || 'No Description'}</td>
              <td className={tx.type === 'Income' ? 'income' : 'expense'}>
                {tx.amount}
              </td>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(index)}>
                    🖊️ Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(index)}>
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;

