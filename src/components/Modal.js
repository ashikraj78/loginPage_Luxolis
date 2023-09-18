function Modal({ isOpen, onClose, message }) {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close-btn" onClick={onClose}>
            &times;
          </span>
          <p className="wrongPassword">{message}</p>
        </div>
      </div>
    )
  );
}

export default Modal;
