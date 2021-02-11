import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

import { Routes } from '../../constants/Routes';

import styles from './footer.module.scss';

function Footer({ admin }) {
    return (
        <footer className={`${admin ? styles.admin : ''} ${styles.footer}`}>
            <div className={styles.col1}>
                <p>
                    <Link to={Routes.accommodation.accommodation} className={styles.footerLink}>
                        Hotels
                    </Link>
                </p>
                <p>
                    <Link to={Routes.contact} className={styles.footerLink}>
                        Contact
                    </Link>
                </p>
                <p>
                    <Link to={Routes.login} className={styles.footerLink}>
                        Log in
                    </Link>
                </p>
            </div>
            <div className={styles.col2}>
                <p>Holidaze © 2021</p>
            </div>
            <div className={styles.col3}>
                <Facebook className={styles.icon} tabIndex={0} />
                <Twitter className={styles.icon} tabIndex={0} />
                <Instagram className={styles.icon} tabIndex={0} />
            </div>
        </footer>
    );
}

export default Footer;
