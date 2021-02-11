import React from 'react';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Button } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BASE_URL, headers, DELETE } from '../../constants/api';

import styles from './delete.module.scss';

function DeleteMessage(props) {
    const history = useHistory();

    const checkDelete = () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Deleting this message will be permanent',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteMessage(),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    const deleteMessage = async () => {
        const url = BASE_URL + 'contacts/' + props.id;
        const options = { headers, method: DELETE };
        await fetch(url, options);
        history.go(0);
    };

    return (
        <Button variant="danger" onClick={checkDelete} className={styles.delete}>
            Delete
        </Button>
    );
}

export default DeleteMessage;
