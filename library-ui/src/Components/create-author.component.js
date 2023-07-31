// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import AuthorForm from "./AuthorForm";

// CreateStudent Component
const CreateAuthor = () => {
    const [formValues, setFormValues] =
        useState({ name: '', lastName: '' })
// onSubmit handler
    const onSubmit = studentObject => {
        axios.post(
            'http://localhost:8080/authors/',
            studentObject,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
        <AuthorForm initialValues={formValues}
                     onSubmit={onSubmit}
                     enableReinitialize>
            Create Author
        </AuthorForm>
    )
}

// Export CreateStudent Component
export default CreateAuthor
