import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import LogOut from '../auth/Logout'
import { NavDropdown } from 'react-bootstrap'

function Navigation() {
    const { user } = useContext(AuthContext)
    return (
        <div className="menu">
            <Navbar bg="light" variant="light" expand="lg">
                <NavLink to="/" exact>
                    <Navbar.Brand>Holidaze</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <div className="navbar__content">
                            <NavLink to="/accommodation" className="nav-link">
                                Hotels
                            </NavLink>
                            <NavLink to="/contact" className="nav-link">
                                Contact
                            </NavLink>
                        </div>
                        <NavDropdown.Divider />
                        <div className="navbar__content">
                            {user ? (
                                <>
                                    <NavLink to="/admin" className="nav-link admin__link ">
                                        Admin
                                    </NavLink>
                                    <LogOut />
                                </>
                            ) : (
                                <NavLink to="/register" className="nav-link admin__link">
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation
