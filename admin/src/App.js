import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar'; // Adjust the path as necessary
import { ToastContainer, toast } from 'react-toastify'; // Import toast here
import 'react-toastify/dist/ReactToastify.css';

import AttractivePlaces from './pages/AttractivePlaces';
import Accomodation from './pages/Accomodation';
import Foods from './pages/Foods';
import Medicine from './pages/Medicine';
import Transport from './pages/Transport';
import Main from './pages/Main';
import EditService from './Components/EditService/EditService';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <NavBar />
        <div className='app-admin'>
          <Routes>
            <Route path="/accommodation" element={<Accomodation />} />
            <Route path="/food-shop" element={<Foods />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/medical-centers" element={<Medicine />} />
            <Route path="/attractive-places" element={<AttractivePlaces />} />
            <Route path="/edit/:id" element={<EditService />} /> {/* Edit page route */}
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </div>
      <ToastContainer 
        className="toast-container" // Set your custom class name
        position="top-right" // Set the position to top right
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false} // Show the progress bar
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </Router>
  );
}

export default App;
