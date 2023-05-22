import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserId }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the username and password to the backend for authentication
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data)
                    // Set the user ID and redirect to the appropriate homepage based on the user's role
                    setUserId(data.userId);
                    if (data.role === 'admin') {
                        history('/admin-home');
                    } else {
                        history('/user-home');
                    }
                } else {
                    alert('Login failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <br />
                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <br />
                <br />

                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
