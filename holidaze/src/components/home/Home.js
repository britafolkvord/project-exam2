import React from "react";
import Heading from "../layout/Heading";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home() {
    return (
  
    <div className="hero">
    <Heading title="Find hotels in Bergen"/>
    <Link to="/accommodation/Accommodation" className="button__link">
    <Button className="hero__btn--grey">Find hotel</Button>
    </Link>
    </div>
    )};

export default Home;