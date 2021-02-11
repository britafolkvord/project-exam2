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
                    <Link to={Routes.contact} className={styles.footerLink}>
                        Contact
                    </Link>
                </p>
            </div>
            <div className={styles.col2}>
                <p>
                    <Link to={Routes.home} className={styles.footerLink}>
                        Holidaze © 2021
                    </Link>
                </p>
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
