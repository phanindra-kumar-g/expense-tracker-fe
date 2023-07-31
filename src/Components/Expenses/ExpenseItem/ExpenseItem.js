import { useState } from "react";
import Calender from "../../Common/Calender/Calender.js";
import ViewReceipt from "../../Common/View-Receipt/ViewReceipt.js";
import "./ExpenseItem.scss";

const ExpenseItem = (props) => {
  const { expense } = props;
  const [receiptData, setReceiptData] = useState("");

  const onSelectExpense = async () => {
    try {
      const payload = {
        fileName: expense.file.path
      }
      const res = await fetch("http://localhost:3500/file/get", {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const resData = await res.json();

      if(resData.code === 200 && resData.status) {
        const base64 = `data:${expense.file.mimetype};base64, ${resData.data}`;
        console.log("Base 64: ", base64);
        setReceiptData(base64);
      } else {
        alert(resData.message);
      }
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
      {receiptData && (
        <ViewReceipt
          fileBase64={receiptData}
          closeReceipt={closeReceiptModal}
        />
      )}
    </>
  );
};

export default ExpenseItem;
