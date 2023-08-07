import React, { useState, useEffect } from "react";
import axios from 'axios';
import BookBootstrapForm from "./book-form.component";

// CreateStudent Component
const CreateBook = () => {
    const [formValues, setFormValues] =
        useState({ title: '', authorId: '' })
// onSubmit handler
    const onSubmit = (event) => {
        let body = {
            title: event.target.title.value,
            authorId: event.target.authorId.value
        };
        axios.post(
            'http://localhost:8080/books/',
            body,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(res => {
                if (res.status === 200)
                    alert('Book successfully created')
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    }

// Return student form
    return(
        <BookBootstrapForm initialValues={formValues}
                    onSubmit={onSubmit}
                    enableReinitialize>
            Create Book
        </BookBootstrapForm>
    )
}

// Export CreateStudent Component
export default CreateBook