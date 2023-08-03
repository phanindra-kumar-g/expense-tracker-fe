import { useState } from "react";
import Calender from "../../Common/Calender/Calender.js";
import ViewReceipt from "../../Common/View-Receipt/ViewReceipt.js";
import "./ExpenseItem.scss";

const ExpenseItem = (props) => {
  const { expense } = props;
  const [receiptData, setReceiptData] = useState(false);

  const onSelectExpense = async () => {
    try {
      setReceiptData(true);
    } catch(err) {
      alert("Error while retriving the attachment.");
    }
    
  };

  const closeReceiptModal = (event) => {
    setReceiptData("");
  };

  return (
    <>
      <div className="expense-item" tabIndex="0" onClick={onSelectExpense}>
        <div className="expense-item-left">
          <Calender date={expense.date}></Calender>
          <div className="expense-title">
            <div>{expense.title}</div>
            <div className="expense-desc">{expense.description}</div>
          </div>
        </div>
        <div className="expense-amount">
          <div className={expense.type}>${expense.amount}</div>
          <i className="fa fa-file-pdf-o file-preview" aria-hidden="true"></i>
        </div>
      </div>
      {receiptData && expense.file && (
        <ViewReceipt 
          fileBase64={expense.file}
          closeReceipt={closeReceiptModal}
        />
      )}
    </>
  );
};

export default ExpenseItem;
