import Form from 'react-bootstrap/Form';
import {Button, Dropdown} from "react-bootstrap";
import BookTableRow from "./BookTableRow";
import React from "react";

function BookBootstrapForm(props) {
    console.log(props.authorList.authors);
    const onSelect = (event) => {
        alert(event);
    }
    const AuthorList = () => {
        if (props.authorList && props.authorList.authors) {
            return props.authorList.authors.map((res, i) => {
                return <Dropdown.Item eventKey={res.id}>{res.lastName}</Dropdown.Item>
            });
        }
    };
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Tytuł" defaultValue={props.initialValues.title}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="authorId">
                <Form.Label>Author's id </Form.Label>
                <Form.Control type="text" placeholder="Id" defaultValue={props.initialValues.authorId}/>
            </Form.Group>
            <Dropdown onSelect={onSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Authors
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {AuthorList()}
                </Dropdown.Menu>
            </Dropdown>
            <Button as="input" type="submit" value="Save"/>
        </Form>
    );
}

export default BookBootstrapForm;