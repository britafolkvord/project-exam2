import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import { AuthContext } from '../../../context/AuthContext';
import LogOut from '../../logout/Logout';

import styles from './nav.module.scss';

function PublicNav() {
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
                                    <NavLink
                                        to="/admin/dashboard"
                                        className={styles.navLink}
                                        activeClassName={styles.active}
                                    >
                                        Admin
                                    </NavLink>
                                    <LogOut />
                                </>
                            ) : (
                                <NavLink to="/login" className={styles.login} activeClassName={styles.active}>
                                    Login
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`bi bi-person-circle ${styles.bi}`}
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                        />
                                    </svg>
                                </NavLink>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default PublicNav;
