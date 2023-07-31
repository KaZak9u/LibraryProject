import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const BookForm = (props) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        authorId: Yup.string().required("Required"),
    });
    console.log(props);
    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup>
                        <label htmlFor="title"> Title</label>
                        <Field name="title" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="title"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="authorId"> author's id</label>
                        <Field name="authorId" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="authorId"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <Button variant="danger" size="lg"
                            block="block" type="submit" className="kacper">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default BookForm;