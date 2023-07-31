import Modal from "../Modal/Modal";
import "./ViewReceipt.scss";

const ViewReceipt = (props) => {
  const { fileBase64, closeReceipt } = props;

  return (
    <Modal onOverLayClick={closeReceipt}>
      <div className="view-receipt-wrapper">
        <img src={fileBase64} width="100%" ></img>
      </div>
    </Modal>
  );
};

export default ViewReceipt;
