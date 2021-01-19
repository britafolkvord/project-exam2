import React from "react";
//import { FETCH_OPTIONS, BASE_URL } from "../../constants/constants";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Heading from '../layout/Heading';
import ErrorMessage from "./ErrorMessage";
import { Container } from "react-bootstrap";

const schema = yup.object().shape({
    name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    message: yup
        .string()
        .min(10,"The message must be at least 10 characters")
        .required("A message is required")
});

export default function Contact() {
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    function onSubmit(data) {
        console.log(data);
        /*const url = BASE_URL + "contacts";
        FETCH_OPTIONS.method = "POST";
         FETCH_OPTIONS.body = JSON.stringify(data);

        fetch(url, FETCH_OPTIONS)
        .then((r) => r.json())
        .then((j) => console.log(j));
        */}
  
    return (
      <>
      <Container>
      <Heading title="Contact"/>
      <Form onSubmit={handleSubmit(onSubmit)}>
  
                  <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" placeholder="Enter your name" ref={register} />
                  {errors.name && <ErrorMessage errMsg={errors.name?.message} />}
                  </Form.Group>
  
                  <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" placeholder="Example@email.com" ref={register} />
                 {errors.email && <ErrorMessage errMsg={errors.email?.message} />}
                  </Form.Group>
  
                  <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control name="message" placeholder="Type your message here" as="textarea" rows={5} ref={register} />
                  {errors.message && <ErrorMessage errMsg={errors.message?.message} />}
                  </Form.Group>
        
        <Button type="submit">Submit</Button>
      </Form>
      </Container>
      </>
    )};

