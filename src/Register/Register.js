import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the username, password, email, and role to the backend for user registration
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, role }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'User signed up successfully') {
                    console.log('Registration successful');
                    // Redirect to the login page
                    history('/login');
                } else {
                    console.log('Registration failed');
                    setErrorMessage('User with the same username or email already exists.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Register Page</h1>
            {errorMessage && <p>{errorMessage}</p>}
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
                <br /><br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <br /><br />
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" value={role} onChange={handleRoleChange}>
                    <option value="User">User</option>
                    <option value="Administrator">Administrator</option>
                </select>
                <br /><br />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;
