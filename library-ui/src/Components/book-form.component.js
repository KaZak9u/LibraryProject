import Form from 'react-bootstrap/Form';
import {Button, Col, Container, Dropdown, Row} from "react-bootstrap";

function BookBootstrapForm(props) {
    const AuthorList = () => {
        if (props.authorList && props.authorList.authors) {
            return props.authorList.authors.map((res, i) => {
                return <Dropdown.Item eventKey={res.id}>{res.lastName}</Dropdown.Item>
            });
        }
    };
    const findAuthorName = (id) =>{
        if (props.authorList && props.authorList.authors) {
            const lista = props.authorList.authors.filter((author) => author.id === id)
            if (lista && lista.length > 0) return lista[0].name + " " + lista[0].lastName;
        };
    }
    return (
        <Container>
            <Form onSubmit={props.onSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Tytuł" onChange={props.onTitleChange} defaultValue={props.initialValues.title}/>
                </Form.Group>
                    <Row className={"align-items-end"}>
                        <Col>
                            <Form.Group className="mb-3" controlId="authorName">
                                <Form.Label>Author </Form.Label>
                                <Form.Control type="text" placeholder="Name"  readOnly={true} defaultValue={findAuthorName(props.initialValues.authorId)}/>
                            </Form.Group>
                        </Col>
                        <Col >
                            <Dropdown className={"drop"} onSelect={props.onAuthorChange}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Select Author
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {AuthorList()}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                <Button as="input" type="submit" value="Save"/>
            </Form>
        </Container>
    );
}

export default BookBootstrapForm;