import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";

function AuthorBootstrapForm(props) {
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group className="mb-3" controlId="authorName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Imię" defaultValue={props.initialValues.name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="authorLastName">
                <Form.Label>Last name </Form.Label>
                <Form.Control type="text" placeholder="Nazwisko" defaultValue={props.initialValues.lastName}/>
            </Form.Group>
            <Button as="input" type="submit" value="Save"/>
        </Form>
    );
}

export default AuthorBootstrapForm;