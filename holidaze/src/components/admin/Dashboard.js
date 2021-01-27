import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Heading from '../layout/Heading';
import Messages from '../adminMessages/Messages';
import Enquiries from '../adminEnquiries/Enquiries';

function Dashboard() {
    return (
        <>
            <Container className="dashboard">
                <Heading title="Dashboard" />
                <Container className="dashboard__links">
                    <NavLink to="/admin/hotels">
                        <Button className="dashboard__btn">Hotels</Button>
                    </NavLink>
                    <NavLink to="/admin/hotels/add">
                        <Button className="dashboard__btn">Add hotel</Button>
                    </NavLink>
                </Container>
                <Messages />
                <Enquiries />
            </Container>
        </>
    );
}

export default Dashboard;
