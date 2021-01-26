import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BASE_URL, headers } from '../../constants/api';
import Heading from '../layout/Heading';
import DeleteMessage from './DeleteMessage';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = BASE_URL + 'contacts';
        const options = { headers };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.table(json);
                // handle error
                if (json.error) {
                    setMessages([]);
                    setError(json.message);
                } else {
                    setMessages(json);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Container className="contacts">
            <Heading title="Messages" />
            {error && <div className="error">{error}</div>}
            <Container className="contacts__container">
                {messages.map((message) => {
                    return (
                        <div key={message.id} className="contacts__message">
                            <h2>{message.name}</h2>
                            <p>{message.email}</p>
                            <p>Sent : {message.createdAt}</p>
                            <p>{message.message}</p>
                            <div className="contacts__btn--delete">
                                <DeleteMessage id={message.id} />
                            </div>
                        </div>
                    );
                })}
            </Container>
        </Container>
    );
}

export default Messages;
