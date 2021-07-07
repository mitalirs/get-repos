import React from 'react'
import {Button, Container, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form1 = (props) => {

    const onSubmit = function (e) {
        e.preventDefault()
        props.setUsername(e.target[0].value)
    }

    
    return (
        <Container id='formContainer' >
            <Form id="gitHubForm" onSubmit = { e => onSubmit(e) }>
                <Form.Group id="form">
                <Form.Control 
                type="text" 
                placeholder="Enter GitHub Username" 
                id='usernameInput' 
                disabled = {props.isFetching}
                />
                </Form.Group>

                <Button variant="dark" type="submit" id="submitButton" disabled={props.isFetching}>
                    Submit
                </Button>
            </Form>
        </Container>
    ); 

}
 
export default Form1;