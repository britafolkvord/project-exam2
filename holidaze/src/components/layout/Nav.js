import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logout from "../auth/Logout";

function Navigation() {
    const { user } = useContext(AuthContext);
    return (
        <div className="menu">
            <Navbar bg="dark" variant="dark" expand="lg">
                <NavLink to="/" exact>
                    <Navbar.Brand>Holidaze</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/*<NavLink to="/" exact className="nav-link">
                            Home
                        </NavLink>*/}
                        <NavLink to="/accommodation" className="nav-link">
                            Hotels
                        </NavLink>
                        <NavLink to="/contact" className="nav-link">
                            Contact
                        </NavLink>
                        {user ? (
                <>
                    <NavLink to="/admin" className="nav-link admin-link">Admin</NavLink>
                    <Logout />
                </>
            ) : (
                <NavLink to="/register" className="nav-link">Login</NavLink>
            )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;