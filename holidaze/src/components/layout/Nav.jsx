import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

import { AuthContext } from '../../context/AuthContext';
import LogOut from '../logout/Logout';
import { Routes } from '../../constants/Routes';

import styles from './nav.module.scss';

function Navigation({ admin }) {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <Navbar className={`${admin ? styles.admin : ''} ${styles.nav}`} expand="lg">
                <NavLink to={Routes.home} exact className={styles.logoLink}>
                    <div className={styles.navbarBrand}>Holidaze</div>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={styles.dropdown}>
                    <Nav className={styles.navbarNav}>
                        <div className={styles.navbarContent}>
                            <NavLink
                                to={Routes.accommodation.accommodation}
                                className={styles.navLink}
                                activeClassName={styles.active}
                            >
                                Hotels
                            </NavLink>
                            <NavLink to={Routes.contact} className={styles.navLink} activeClassName={styles.active}>
                                Contact
                            </NavLink>
                        </div>
                        <NavDropdown.Divider />
                        <div className={styles.navbarContent}>
                            {user ? (
                                <>
                                    <NavLink
                                        to={Routes.admin.dashboard}
                                        className={styles.navLink}
                                        activeClassName={styles.active}
                                    >
                                        Admin
                                    </NavLink>
                                    <LogOut />
                                </>
                            ) : (
                                <NavLink to={Routes.login} className={styles.login} activeClassName={styles.active}>
                                    Login
                                    <PersonCircle className={styles.icon} />
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
