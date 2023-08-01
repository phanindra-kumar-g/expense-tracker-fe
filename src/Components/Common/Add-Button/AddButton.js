import "./AddButton.scss";

const AddButton = (props) => {
  const { onAddExpenseClick } = props;
  const onClickHandler = (props) => {
    onAddExpenseClick();
  };

  return (
    <div className="add-button" tabIndex="0" onClick={onClickHandler}>
      <i className="fa fa-plus" aria-hidden="true"></i>
    </div>
  );
};

export default AddButton;
