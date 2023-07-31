import React, { useState, useEffect } from "react";
import axios from 'axios';
import BookForm from "./BookForm";

// CreateStudent Component
const CreateBook = () => {
    const [formValues, setFormValues] =
        useState({ title: '', authorId: '' })
// onSubmit handler
    const onSubmit = studentObject => {
        axios.post(
            'http://localhost:8080/books/',
            studentObject,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
        <BookForm initialValues={formValues}
                    onSubmit={onSubmit}
                    enableReinitialize>
            Create Book
        </BookForm>
    )
}

// Export CreateStudent Component
export default CreateBook