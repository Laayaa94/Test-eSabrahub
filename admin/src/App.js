import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar'; // Adjust the path as necessary

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
    </Router>
  );
}

export default App;
