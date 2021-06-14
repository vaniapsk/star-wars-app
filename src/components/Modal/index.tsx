import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps{
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#F0F0F5',
    color: '#000000',
    borderRadius: '8px',
    width: '736px',
    height: '700px',
    border: 'none',

  },
};

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
