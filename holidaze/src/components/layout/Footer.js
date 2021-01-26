import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';

function Footer() {
    return (
        <Footer>
            <div className={styles.col1}>
                <h3>
                    <Link to="../../contact/Contact">Contact</Link>
                </h3>
            </div>
            <div className={styles.col2}>
                <h3>Holidaze © 2021</h3>
            </div>
            <div className={styles.col3}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                ></svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                ></svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                ></svg>
            </div>
        </Footer>
    );
}

export default Footer;
