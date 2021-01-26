import React from 'react';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Button from 'react-bootstrap/Button';
import { BASE_URL, headers, DELETE } from '../../constants/api';

import 'react-confirm-alert/src/react-confirm-alert.css';

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
        <Button variant="danger" onClick={checkDelete}>
            Delete
        </Button>
    );
}

export default DeleteMessage;
