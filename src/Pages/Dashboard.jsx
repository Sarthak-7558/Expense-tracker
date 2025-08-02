import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import Transactioncard from 'Components/Transactioncard';
import '../styles/transactioncards.css';
import Recenttransaction from '../Components/Recenttransaction';
import { Link } from 'react-router-dom';
import Notransaction from 'Components/Notransaction';
import { MdInsertChartOutlined } from "react-icons/md"; // <-- Chart icon

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [transactions, settransactions] = useState([]);
  const [totalIncome, settotalIncome] = useState(0);
  const [TotalExpense, setTotalExpense] = useState(0);
  const [balance, setbalance] = useState(0);
  const [categoryData, setcategoryData] = useState({});
  const [maxExpense, setmaxExpense] = useState(0);

  const categories = [
    "Salary",
    "Groceries",
    "Dining",
    "Transport",
    "Entertainment",
    "Others"
  ];

  useEffect(() => {
    const existingTransaction = JSON.parse(localStorage.getItem("transactions")) || [];
    settransactions(existingTransaction);

    let Income = 0;
    let Expense = 0;
    let categorybreakdown = {};
    let highestExpense = 0;

    categories.forEach(cat => categorybreakdown[cat] = 0);

    existingTransaction.forEach(tx => {
      if (tx.type === 'Income') {
        Income += tx.amount;
      } else {
        Expense += tx.amount;
        categorybreakdown[tx.category] = (categorybreakdown[tx.category] || 0) + tx.amount;
        if (categorybreakdown[tx.category] > highestExpense) {
          highestExpense = categorybreakdown[tx.category];
        }
      }
    });

    settotalIncome(Income);
    setTotalExpense(Expense);
    setbalance(Income - Expense);
    setcategoryData(categorybreakdown);
    setmaxExpense(highestExpense);
  }, []);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categories.map(cat => categoryData[cat]),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: maxExpense + 100
      }
    }
  };

  const isChartEmpty = Object.values(categoryData).every(val => val === 0);

  return (
    <>
      <div className='dashboard'>
        <div className='dashboard-inner'>
          <h2>Dashboard</h2>
          <Link to="/addtransaction" className='add-transaction-button'>+ Add Transaction</Link>
        </div>
      </div>

      <Transactioncard
        totalIncome={totalIncome}
        TotalExpense={TotalExpense}
        balance={balance}
      />

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Recent Transactions</h3>
          {transactions.length === 0
            ? <Notransaction />
            : <Recenttransaction transactions={transactions} />}
        </div>

        <div className="dashboard-card">
          <h3>Expenses by Category</h3>
          {isChartEmpty ? (
            <div className="no-chart-data">
              <MdInsertChartOutlined className="no-chart-icon" />
              <p>No expense data available yet</p>
            </div>
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
