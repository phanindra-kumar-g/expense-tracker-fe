import Modal from "../Modal/Modal";
import "./ViewReceipt.scss";

const ViewReceipt = (props) => {
  const { fileBase64, closeReceipt } = props;

  return (
    <Modal onOverLayClick={closeReceipt}>
      <div className="view-receipt-wrapper">
        <iframe src={fileBase64} width="100%" height="100%" alt="Receipt"></iframe>
      </div>
    </Modal>
  );
};

export default ViewReceipt;
