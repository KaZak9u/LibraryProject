// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import AuthorBootstrapForm from "./author-form.component";

// CreateStudent Component
const CreateAuthor = () => {
    const [formValues, setFormValues] =
        useState({ name: '', lastName: '' })
// onSubmit handler
    const onSubmit = (event) => {
        let body = {
            name: event.target.authorName.value,
            lastName: event.target.authorLastName.value
        };
        axios.post(
            'http://localhost:8080/authors/',
            body,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(res => {
                if (res.status === 200)
                    alert('Author successfully created')
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    }

// Return student form
    return(
        <AuthorBootstrapForm initialValues={formValues}
                     onSubmit={onSubmit}
                     enableReinitialize>
            Create Author
        </AuthorBootstrapForm>
    )
}

// Export CreateStudent Component
export default CreateAuthor
