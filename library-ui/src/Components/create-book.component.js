import React, { useState, useEffect } from "react";
import axios from 'axios';
import BookBootstrapForm from "./book-form.component";
import {useParams} from "react-router-dom";

// CreateStudent Component
const CreateBook = (props) => {
    const [formValues, setFormValues] =
        useState({ title: '', authorId: '' })
    const [authors, setAuthors] = useState({})
    const { id } = useParams()

    const onAuthorChange = (newAuthorid) => {
        setFormValues({...formValues, authorId: parseInt(newAuthorid)})
    }
    const onTitleChange = (event) => {
        setFormValues({...formValues, title: event.target.value})
    }
// onSubmit handler
    const onSubmit = (event) => {
        axios.post(
            'http://localhost:8080/books/',
            formValues,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(res => {
                if (res.status === 200)
                    alert('Book successfully created')
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    };
    useEffect(() => {
        axios
            .get(
                "http://localhost:8080/authors/"
            )
            .then((res) => {
                const authors = res.data;
                setAuthors({authors });
            })
            .catch((err) => console.log(err));
    }, [id]);

// Return student form
    return(
        <BookBootstrapForm
            initialValues={formValues}
            onSubmit={onSubmit}
            authorList={authors}
            onAuthorChange={onAuthorChange}
            onTitleChange={onTitleChange}
            enableReinitialize>
            Create Book
        </BookBootstrapForm>
    )
}

// Export CreateStudent Component
export default CreateBook