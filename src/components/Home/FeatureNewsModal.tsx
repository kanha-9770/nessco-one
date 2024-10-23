import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-[#f2f2f2] bg-opacity-50 backdrop-blur fixed top-0 lg:top-14 bottom-0 right-0 left-0 flex items-center justify-center z-50 font-regular font-poppins"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white drop-shadow-lg p-[1rem] rounded-3xl relative flex lg:w-[60rem] w-full  lg:mx-0 mx-[1rem] justify-center items-center " onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className='absolute top-[0.5rem] right-[1rem]'
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
