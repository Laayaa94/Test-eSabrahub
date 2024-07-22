import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import CreatePost from '../CreatePost/CreatePost';
import './CreatePostNavBar.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const CreatePostNavBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <nav className="create-post-nav">
        <ul>
          <li>
            <button className="nav-button" onClick={openModal}>
              <FontAwesomeIcon icon={faPen} />
            </button>
          </li>
          <li>
            <button className="nav-button">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </li>
          <li>
            <button className="nav-button">
              <FontAwesomeIcon icon={faHome} />
            </button>
          </li>
        </ul>
      </nav>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Post Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="close-modal-button">X</button>
        <CreatePost />
      </Modal>
    </>
  );
};

export default CreatePostNavBar;
