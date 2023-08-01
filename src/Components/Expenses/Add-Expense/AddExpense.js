import { useRef, useState } from "react";
import "./AddExpense.scss";
import Modal from "../../Common/Modal/Modal";

const AddExpense = (props) => {
  const { showForm, closeForm } = props;
  const title = useRef();
  const description = useRef();
  const amount = useRef();
  const date = useRef();
  const expenseType = useRef();
  const [file, setFile] = useState("");

  const closeFormHandler = () => {
    closeForm();
  };

  const onFileChange = async (event) => {
    try {
      const payload = new FormData();
      payload.append("file", event.target.files[0]);
      const res = await fetch("http://localhost:3500/file/upload", {
        method: "post",
        body: payload,
      });
      const resData = await res.json();
      if (resData.status && resData.code === 200) {
        setFile(resData.data);
      } else {
        alert(resData.message);
      }
    } catch (err) {
      console.log("AddExpense:addNewExpense-- Error occured: ", err);
      alert("Failed to upload file");
    }
  };

  const addNewExpense = async (event) => {
    try {
      const titleVal = title.current.value.trim();
      const descriptionVal = description.current.value.trim();
      const amountVal = amount.current.value.trim();
      const dateVal = date.current.value;
      const typeVal = expenseType.current.value;
      const isValidFormData =
        titleVal !== "" &&
        descriptionVal !== "" &&
        amountVal !== "" &&
        dateVal !== "" &&
        file !== "" &&
        typeVal !== "";
      if (!isValidFormData) {
        alert("Form is invalid, missing fields!");
        return;
      }
      const payload = {
        title: title.current.value,
        description: description.current.value,
        amount: Number(amount.current.value).toFixed(2),
        date: date.current.value,
        file: file,
        type: typeVal
      };

      const res = await fetch("http://localhost:3500/expenses/update", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (resData.status && resData.code === 200) {
        alert("Saved Successfully!");
        closeForm(resData.expenses);
      } else {
        console.error("AddExpense:addNewExpense-- ", resData.message);
        alert(resData.message);
      }
    } catch (err) {
      console.error("AddExpense:addNewExpense-- Error occured: ", err);
      alert("Unable to save expense, please try again later!");
    }
  };

  return (
    showForm && (
      <Modal onOverLayClick={closeFormHandler}>
        <div className="add-expense-wrapper">
          <div className="add-expense-title">Add New Expense</div>
          <div className="form-field">
            <div className="label">Title</div>
            <input type="text" ref={title} />
          </div>
          <div className="form-field">
            <div className="label">Description</div>
            <textarea ref={description}></textarea>
          </div>
          <div className="form-field">
            <div className="label">Amount</div>
            <input type="number" ref={amount} />
          </div>
          <div className="form-field">
            <div className="label">Date</div>
            <input type="date" ref={date} />
          </div>
          <div className="form-field">
            <div className="label">Type</div>
            <select ref={expenseType}>
              <option selected default hidden value="">Select</option>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>
          <div className="form-field">
            <div className="label">Bill/Receipt</div>
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="button-wrapper">
            <button className="btn btn-secondary" onClick={closeFormHandler}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={addNewExpense}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default AddExpense;
