import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LogOut from '../auth/Logout';
import { NavDropdown } from 'react-bootstrap';
import styles from './nav.module.scss';

function Navigation() {
    const { user } = useContext(AuthContext);
    return (
        <div className="menu">
            <Navbar className={styles.navColor} expand="lg">
                <NavLink to="/" exact className={styles.logoLink}>
                    <div className={styles.navbarBrand}>Holidaze</div>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={styles.dropdown}>
                    <Nav className={styles.navbarNav}>
                        <div className={styles.navbarContent}>
                            <NavLink to="/accommodation" className={styles.navLink} activeClassName={styles.active}>
                                Hotels
                            </NavLink>
                            <NavLink to="/contact" className={styles.navLink} activeClassName={styles.active}>
                                Contact
                            </NavLink>
                        </div>
                        <NavDropdown.Divider />
                        <div className={styles.navbarContent}>
                            {user ? (
                                <>
                                    <NavLink to="/admin" className={styles.navLink} activeClassName={styles.active}>
                                        Admin
                                    </NavLink>
                                    <LogOut />
                                </>
                            ) : (
                                <NavLink to="/register" className={styles.login} activeClassName={styles.active}>
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;
