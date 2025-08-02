import React from 'react'

const Transactioncard = (props) => {
  return (
    <div>
     <div className='balance-card'>
        <p>Current Balance</p>
        <h1>{props.balance}</h1>
     </div>
     <div className='summary-cards'>

         <div className='income-card'>
            <p>Total Income</p>
            <h3 className='income'>{props.totalIncome}</h3>
        </div>
        <div className='expense-card'>
            <p>Total Expenditure</p>
            <h3 className='expense'>{props.TotalExpense}</h3>
        </div>
       

     </div>
    </div>
  )
}

export default Transactioncard
