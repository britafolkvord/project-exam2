import React, { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const existingUser = localStorage.getItem('user') || null
    const existingPassword = localStorage.getItem('password') || null

    const [user, setUser] = useState(existingUser)
    const [password, setPassword] = useState(existingPassword)

    function registerUser(username, userPassword) {
        localStorage.setItem('user', JSON.stringify(username))
        localStorage.setItem('password', JSON.stringify(userPassword))

        setUser(username)
        setPassword(userPassword)
    }

    function logout() {
        setUser(null)
        setPassword(null)
        localStorage.removeItem('user')
        localStorage.removeItem('password')
    }

    return <AuthContext.Provider value={{ user, password, registerUser, logout }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider }
