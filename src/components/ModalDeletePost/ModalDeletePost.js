import Modal from "react-modal";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: null,
    border: "none",
    transform: "translate(-50%, -50%)",
  },
};

export function DeleteModal({
  setIsOpen,
  postIdClicked,
  modalIsOpen,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <DeleteConfirmation
        setIsOpen={setIsOpen}
        postIdClicked={postIdClicked}Z
      />
    </Modal>
  );
}
