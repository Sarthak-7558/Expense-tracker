import React from 'react';
import '../styles/recenttransaction.css';

const Recenttransaction = ({ transactions }) => {
  const Categoryemojis = {
    Salary: "💼",
    Groceries: "🛒",
    Dining: "🍽️",
    Transport: "🚗",
    Entertainment: "🎬",
    Others: "📦"
  };

  return (
    <div className="recent-transactions-container">
      <ul className="recent-transactions-list">
        {transactions.slice(-10).reverse().map((tx, i) => (
          <li className="transaction-item" key={i}>
            <div className="transaction-left">
              <span className="emoji">{Categoryemojis[tx.category]}</span>
              <span className="type">{tx.type}</span>
            </div>
            <div className={`amount ${tx.type === 'Income' ? 'income' : 'expense'}`}>
              ₹{tx.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recenttransaction;
