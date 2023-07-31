import "./Modal.scss";

const Modal = (props) => {
  const { onOverLayClick } = props;

  const overLayClickHandler = (event) => {
    event.stopPropagation();
    onOverLayClick(event);
  };

  return (
    <div className="modal-wrapper">
      <div
        className="modal-overlay"
        tabIndex="0"
        onClick={overLayClickHandler}
      ></div>
      <div className="modal-body">{props.children}</div>
    </div>
  );
};

export default Modal;
