import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Button from 'react-bootstrap/Button'

function LogOut() {
    const { logout } = useContext(AuthContext)
    const history = useHistory()

    function doLogout() {
        logout()
        history.push('/')
    }

    return (
        <Button onClick={doLogout} className="button--clay">
            Log out
        </Button>
    )
}

export default LogOut
