import { useRef, useState } from "react";
import "./AddExpense.scss";
import Modal from "../../Common/Modal/Modal";
import { updateRecords } from "../../Sheets";
import { convertFileToBase64 } from "../../Common/Common";

const AddExpense = (props) => {
  const { showForm, closeForm, allExpenses } = props;
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
      const base64 = await convertFileToBase64(event.target.files[0]);
      setFile(base64);      
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
        (file !== "" || file === "") &&
        typeVal !== "";
      if (!isValidFormData) {
        alert("Form is invalid, missing fields!");
        return;
      }
      let fileArray = file !== "" ? file.match(/.{1,50000}/g) : "";
      const dateArray = dateVal.split("-");
      const formatttedDate = dateArray[1] + "-" + dateArray[2] + "-" + dateArray[0];
      const payload = [
        `expense${allExpenses.length + 1}`,
        title.current.value,
        description.current.value,
        Number(amount.current.value).toFixed(2),
        formatttedDate,
        typeVal,
        ...fileArray,
      ];

      const res = await updateRecords(payload);
      console.log("Response: ", res);
      const newExpenses = [
        ...allExpenses,
        {
          id: payload[0],
          title: payload[1],
          description: payload[2],
          amount: payload[3],
          date: payload[4],
          type: payload[5],
          file: file
        }
      ];
      closeForm(newExpenses);
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
              <option selected defaultValue hidden>Select</option>
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
