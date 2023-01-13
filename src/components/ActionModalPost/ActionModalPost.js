import Modal from "react-modal";
import DialogConfirmation from "../DialogConfirmation/DialogConfirmation";
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
  overlay: {zIndex: 1000}
};

export function ActionModal({
  setIsOpen,
  postIdClicked,
  modalIsOpen
}) {
  return (
    <Modal
      isOpen={modalIsOpen === "delete" || modalIsOpen === "repost"}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <DialogConfirmation
        setIsOpen={setIsOpen}
        postIdClicked={postIdClicked}
        typeModal={modalIsOpen}
      />
    </Modal>
  );
}


