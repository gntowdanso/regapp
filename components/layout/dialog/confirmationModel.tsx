import React from 'react';

interface ConfirmationModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete this user?</h3>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
