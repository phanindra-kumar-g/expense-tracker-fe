import "./Modal.scss";

const Modal = (props) => {
  const { onOverLayClick } = props;

  const overLayClickHandler = (event) => {
    event.stopPropagation();
    onOverLayClick(event);
  };

  return (
    <div className="modal-wrapper" tabIndex="0" onClick={overLayClickHandler}>
      <div className="modal-body">{props.children}</div>
    </div>
  );
};

export default Modal;
