import React from 'react';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Button from 'react-bootstrap/Button';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BASE_URL, headers, DELETE } from '../../constants/api';

import styles from './delete.module.scss';

function DeleteMessage(props) {
    const history = useHistory();
    console.log(props.id);

    function checkDelete() {
        confirmAlert({
            title: 'Confirm deletion',
            buttons: [
                {
                    label: 'yes',
                    onClick: () => deleteMessage(),
                },
                {
                    label: 'no',
                },
            ],
        });
    }

    async function deleteMessage() {
        const url = BASE_URL + 'contacts/' + props.id;
        const options = { headers, method: DELETE };
        await fetch(url, options);
        history.push('/admin/messages');
    }

    return (
        <Button variant="danger" onClick={checkDelete} className={styles.delete}>
            Delete
        </Button>
    );
}

export default DeleteMessage;
