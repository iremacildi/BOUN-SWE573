import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
//pages
import EditService from './Pages/EditService';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import Profile from './Pages/Profile';

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editservice" element={<EditService />} />
        <Route path="/createservice" element={<EditService />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;