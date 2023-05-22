import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Register from './Register/Register';
import UserHome from './Homepage/UserHome';
import AdminHome from "./Homepage/AdminHome";

const App = () => {
    const [userId, setUserId] = useState('');

    return (
        <Router>
            <div>
                <Navbar userId={userId}/>
                <Routes>
                    <Route exact path="/" element={<Login setUserId={setUserId} />} />
                    <Route path="/login" element={<Login setUserId={setUserId} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user-home" element={<UserHome userId={userId} />} />
                    <Route path="/admin-home" element={<AdminHome userId={userId} />} />
                    {/* Add more routes for other pages/components */}
                </Routes>
            </div>
            <h1>{userId}</h1>
        </Router>
    );
};

export default App;
