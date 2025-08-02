// import React, { useEffect, useState } from 'react'
// import '../styles/addtransaction.css';
// import { useLocation } from 'react-router-dom';

// const AddTransaction = () => {
//     const [type, settype] = useState("");
//     const [amount, setamount] = useState("");
//     const [category, setcategory] = useState("");
//     const [description, setdescription] = useState("");
//     const [date, setdate] = useState("");
//     const [transaction, settransaction] = useState("");
//     const [EditIndex, setEditIndex] = useState(null)

//     const location=useLocation();

//     const handleaddtransaction=()=>{
//         console.log(type,amount,category,description,date);
//         if(!amount || !date || !type || !category){
//             return alert("Please fill all the fields");
//         }

//         const currentTransaction={
//             type:type,
//             amount:parseFloat(amount),
//             category:category,
//             description:description,
//             date:date

//         }
//         let newTransactions;
//         if(EditIndex==null){
//            newTransactions=[...transaction,currentTransaction];
//         }
//         else{
//           newTransactions=[...transaction]
//           newTransactions[EditIndex]=currentTransaction;
//         }
        
//         console.log(transaction);
//         settransaction(newTransactions);
//         console.log(newTransactions);
//         localStorage.setItem("transactions",JSON.stringify((newTransactions)));

//         if(EditIndex!=null){
//           alert(`${type} updated successfully!!`)
//         }
//         else{
//           alert(`${type} Added Successfully!!`);
//         }
        

//         settype("");
//         setamount("");
//         setcategory("");
//         setdescription("");
//         setdate("");

//     }

//     useEffect(() => {
//       const existingtransactions=JSON.parse(localStorage.getItem("transactions")) || [];
//       settransaction(existingtransactions);
//       console.log(location.state);
//       if(location.state && location.state.transaction ){
//         const transaction=location.state.transaction;
//         settype(transaction.type);
//         setamount(transaction.amount);
//         setcategory(transaction.category);
//         setdescription(transaction.description);
//         setdate(transaction.date);
//         setEditIndex(transaction.index);
//       }
//     }, [location])
    

   

   
//   return (
//     <div>
//       <h2>Add Transaction</h2>
//       <div className='Transaction-box'>
//         <div className='Transaction-type'>
//             <label>
//                 <input type="radio" checked={type=="Expense"} value="Expense" onChange={()=>{settype("Expense")}}/> Expense
//             </label>
//              <label>
//                 <input type="radio" checked={type=="Income"} value="Income" onChange={()=>{settype("Income")}}/> Income
//             </label>  
//         </div>
//         <input type="number" placeholder='Amount (₹)' value={amount} onChange={(e)=>setamount(e.target.value)}></input>
//       <select value={category} onChange={(e)=>{setcategory(e.target.value)}} >
//         <option value="" >Select a category</option>
//         <option value="Salary">Salary</option>
//         <option value="Groceries">Groceries</option>
//         <option value="Dining">Dining</option>
//         <option value="Transport">Transport</option>
//         <option value="Entertainment">Entertainment</option>
//         <option value="Others">Others</option>
//       </select>
//       <textarea placeholder='Description' value={description} onChange={(e)=>{setdescription(e.target.value)}}></textarea>
//       <input type='date' value={date} onChange={(e)=>{setdate(e.target.value)}}></input>
//       <button onClick={handleaddtransaction}>{EditIndex==null?'Add Transaction':'Update Transaction'}</button>
//     </div>
//     </div>
//   )
// }

// export default AddTransaction

import React, { useEffect, useState } from 'react';
import '../styles/addtransaction.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const [type, settype] = useState('');
  const [amount, setamount] = useState('');
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [date, setdate] = useState('');
  const [transaction, settransaction] = useState('');
  const [EditIndex, setEditIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleaddtransaction = () => {
    if (!amount || !date || !type || !category) {
      return alert('Please fill all the fields');
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
      alert(`${type} updated successfully!!`);
    } else {
      alert(`${type} Added Successfully!!`);
    }

    settype('');
    setamount('');
    setcategory('');
    setdescription('');
    setdate('');
  };

  useEffect(() => {
    const existingtransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    settransaction(existingtransactions);
    if (location.state && location.state.transaction) {
      const transaction = location.state.transaction;
      settype(transaction.type);
      setamount(transaction.amount);
      setcategory(transaction.category);
      setdescription(transaction.description);
      setdate(transaction.date);
      setEditIndex(transaction.index);
    }
  }, [location]);

  return (
    <div>
      {/* Back to Dashboard button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
      </div>

      <h2>Add Transaction</h2>
      <div className="Transaction-box">
        <div className="Transaction-type">
          <label>
            <input
              type="radio"
              checked={type === 'Expense'}
              value="Expense"
              onChange={() => {
                settype('Expense');
              }}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              checked={type === 'Income'}
              value="Income"
              onChange={() => {
                settype('Income');
              }}
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

