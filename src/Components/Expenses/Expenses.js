import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import AddExpense from "./Add-Expense/AddExpense";
import AddButton from "../Common/Add-Button/AddButton";

import "./Expense.scss";

const Expenses = (props) => {
  const [expensesList, setExpensesList] = useState([]);
  const [total, setTotal] = useState(0);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:3500/expenses");
      const resData = await res.json();
      if (resData.code === 200 && resData.status) {
        setExpensesList(resData.expenses.sort((a, b) => new Date(a.date) - new Date(b.date)));
        let sum = 0;
        resData.expenses.map(exp => sum +=(+exp.amount));
        setTotal(sum.toFixed(2));
      } else {
        alert(resData.message);
      }
    } catch (err) {
      console.log("Error occured: ", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const onAddExpenseClickHandler = (props) => {
    setShowAddExpenseForm(true);
  }

  const onCloseFormClick = (updatedExpensesList = []) => {
    setShowAddExpenseForm(false);

    if(updatedExpensesList && updatedExpensesList.length > 0) {
      setExpensesList(updatedExpensesList);
    }
  }

  return (
    <div className="expense-wrapper">
      <div className="total">${total}</div>
      {expensesList.map((expense) => (
        <ExpenseItem expense={expense} key={expense.id} />
      ))}
      <AddExpense showForm={showAddExpenseForm} closeForm={onCloseFormClick} />
      <AddButton onAddExpenseClick={onAddExpenseClickHandler} />
    </div>
  );
};

export default Expenses;
