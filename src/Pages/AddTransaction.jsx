import React, { useEffect, useState } from 'react';
import '../styles/addtransaction.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTransaction = () => {
  const [type, settype] = useState('');
  const [amount, setamount] = useState('');
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [date, setdate] = useState('');
  const [transaction, settransaction] = useState([]);
  const [EditIndex, setEditIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleaddtransaction = () => {
    if (!amount || !date || !type || !category) {
      toast.error('Please fill all the fields!');
      return;
    }

    const currentTransaction = {
      type: type,
      amount: parseFloat(amount),
      category: category,
      description: description,
      date: date,
    };

    let newTransactions;
    if (EditIndex == null) {
      newTransactions = [...transaction, currentTransaction];
    } else {
      newTransactions = [...transaction];
      newTransactions[EditIndex] = currentTransaction;
    }

    settransaction(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));

    if (EditIndex != null) {
      toast.success(`${type} updated successfully!`);
    } else {
      toast.success(`${type} added successfully!`);
    }

    settype('');
    setamount('');
    setcategory('');
    setdescription('');
    setdate('');
    setEditIndex(null); // Reset index after editing
  };

  useEffect(() => {
    const existingtransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    settransaction(existingtransactions);
    if (location.state && location.state.transaction) {
      const tx = location.state.transaction;
      settype(tx.type);
      setamount(tx.amount);
      setcategory(tx.category);
      setdescription(tx.description);
      setdate(tx.date);
      setEditIndex(tx.index);
    }
  }, [location]);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} />

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
      </div>

      <h2>{EditIndex == null ? 'Add Transaction' : 'Edit Transaction'}</h2>
      <div className="Transaction-box">
        <div className="Transaction-type">
          <label>
            <input
              type="radio"
              checked={type === 'Expense'}
              value="Expense"
              onChange={() => settype('Expense')}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              checked={type === 'Income'}
              value="Income"
              onChange={() => settype('Income')}
            />
            Income
          </label>
        </div>

        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
        />

        <select value={category} onChange={(e) => setcategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Salary">Salary</option>
          <option value="Groceries">Groceries</option>
          <option value="Dining">Dining</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>

        <input type="date" value={date} onChange={(e) => setdate(e.target.value)} />

        <button onClick={handleaddtransaction}>
          {EditIndex == null ? 'Add Transaction' : 'Update Transaction'}
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
