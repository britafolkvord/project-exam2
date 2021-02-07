import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const existingUser = localStorage.getItem('username') || null;
    const existingPassword = localStorage.getItem('password') || null;

    const [user, setUser] = useState(existingUser);
    const [password, setPassword] = useState(existingPassword);

    function loginUser(username, userPassword) {
        setUser(username);
        setPassword(userPassword);
    }

    function logout() {
        setUser(null);
        setPassword(null);
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    return <AuthContext.Provider value={{ user, password, loginUser, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
