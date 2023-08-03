import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import AddExpense from "./Add-Expense/AddExpense";
import AddButton from "../Common/Add-Button/AddButton";

import "./Expense.scss";
import { fetchExpenses } from "../Sheets";

const Expenses = (props) => {
  const [expensesList, setExpensesList] = useState([]);
  const [total, setTotal] = useState({});
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

  const fetchExpensesList = async () => {
    try {
      const response = await fetchExpenses();
      const range = response.result;
      if (!range || !range.values || range.values.length === 0) {
        alert("No values found.");
        return;
      }
      let fetchedList = [];
      range.values.map((item, index) => {
        if(index > 0) {
          const file = item.slice(6, item.lenght).join("");
          fetchedList.push({
            id: item[0],
            title: item[1],
            description: item[2],
            amount: item[3],
            date: item[4],
            type: item[5],
            file: file
          });
        }
      });
      setExpensesList(fetchedList);
      calculateTotalValue(fetchedList);
    } catch (err) {
      console.log("Error occured: ", err);
    }
  };

  const calculateTotalValue = (expList) => {
    let creditAmount = 0;
    let debitAmount = 0;
    expList.map(exp => {
      if(exp.type === "debit") {
        debitAmount += (+exp.amount);
      }
      if(exp.type === "credit") {
        creditAmount += (+exp.amount);
      }
      setTotal({
        debit: debitAmount.toFixed(2),
        credit: creditAmount
      })
    })
  }

  useEffect(() => {
    fetchExpensesList();
  }, []);

  const onAddExpenseClickHandler = (props) => {
    setShowAddExpenseForm(true);
  }

  const onCloseFormClick = (updatedExpenses = []) => {
    setShowAddExpenseForm(false);

    if (updatedExpenses && updatedExpenses.length > 0) {
      setExpensesList(updatedExpenses);
      calculateTotalValue(updatedExpenses);
    }
  }

  return (
    <div className="expense-wrapper">
      <div className="total">Total Debit: {total.debit} $</div>
      <div className="total">Total Credit: {total.credit} $</div>
      {expensesList.map((expense) => (
        <ExpenseItem expense={expense} key={expense.id} />
      ))}
      <AddExpense allExpenses={expensesList} showForm={showAddExpenseForm} closeForm={onCloseFormClick} />
      <AddButton onAddExpenseClick={onAddExpenseClickHandler} />
    </div>
  );
};

export default Expenses;
