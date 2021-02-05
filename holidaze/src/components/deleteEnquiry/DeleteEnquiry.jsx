import React from 'react';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Button from 'react-bootstrap/Button';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BASE_URL, headers, DELETE } from '../../constants/api';

import styles from './delete.module.scss';

function DeleteEnquiry(props) {
    const history = useHistory();

    function checkDelete() {
        confirmAlert({
            title: 'Confirm deletion',
            buttons: [
                {
                    label: 'yes',
                    onClick: () => deleteEnquiry(),
                },
                {
                    label: 'no',
                },
            ],
        });
    }

    async function deleteEnquiry() {
        const url = BASE_URL + 'enquiries/' + props.id;
        const options = { headers, method: DELETE };
        await fetch(url, options);
        history.go(0);
    }

    return (
        <Button variant="danger" onClick={checkDelete} className={styles.delete}>
            Delete
        </Button>
    );
}

export default DeleteEnquiry;
