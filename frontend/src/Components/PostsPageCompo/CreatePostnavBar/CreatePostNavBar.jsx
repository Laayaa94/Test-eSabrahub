import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import './CreatePostNavBar.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const CreatePostNavBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToProfile = () => {
    navigate('/profile'); // Adjust the path as needed
  };

  const scrollToTopOrNavigate = () => {
    if (location.pathname === '/posts') {
      scrollToTop();
    } else {
      navigate('/posts');
    }
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
            <button className="nav-button" onClick={goToProfile}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={scrollToTopOrNavigate}>
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
