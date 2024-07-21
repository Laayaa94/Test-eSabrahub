import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/HomePageCompo/NavBar/NavBar';
//pages
import HomePage from './Pages/HomePage'
import LoginSignupPage from './Pages/LoginSignupPage'
import ChatPage from './Pages/ChatPage'
import PostPage from './Pages/PostPage'

//services pages
import Accommodation from './Pages/Services/Accomodation'
import AttractivePlacesPage from './Pages/Services/AttractivePlacesPage'
import FoodsPage from './Pages/Services/FoodsPage'
import MedicinePage from './Pages/Services/MedicinePage'
import TransportPage from './Pages/Services/TransportPage'
import AboutUs from './Components/HomePageCompo/AboutUs/AboutUs';
import Footer from './Components/HomePageCompo/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className='main-content'>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/food" element={<FoodsPage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/places" element={<AttractivePlacesPage />} />
          <Route path="/about" element={<AboutUs />} />

         

        </Routes>
        <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;
