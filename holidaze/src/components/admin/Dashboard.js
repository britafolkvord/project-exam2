import React from "react";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Heading from "../layout/Heading";

function Dashboard() {
   
    return (
        <>
        <Container>
            <Heading title="Dashboard" />
                    <NavLink to="/admin/hotels"><Button>Hotels</Button></NavLink>
                    <NavLink to="/admin/hotels/add"><Button>Add hotel</Button></NavLink>
                    <NavLink to="/admin/enquiries"><Button>Enquiries</Button></NavLink>
                    <NavLink to="/admin/contact"><Button>Messages</Button></NavLink>
            </Container>
        </>
    );
}

export default Dashboard;