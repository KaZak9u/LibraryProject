// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorForm from "./AuthorForm";
import { useParams } from 'react-router-dom'

const EditAuthor = (props) => {
    const [formValues, setFormValues] = useState({
        name: "",
        lastName: "",
    });
    const { id } = useParams()

//onSubmit handler
    const onSubmit = (studentObject) => {
        axios
            .patch(
                "http://localhost:8080/authors/" +
                id,
                studentObject,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            )
            .then((res) => {
                if (res.status === 200) {
                    alert("Author successfully updated");
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong "+err));
    };

// Load data from server and reinitialize student form
    useEffect(() => {
        axios
            .get(
                "http://localhost:8080/authors/"
                + id
            )
            .then((res) => {
                const { name, lastName} = res.data;
                setFormValues({ name, lastName });
            })
            .catch((err) => console.log(err));
    }, []);

// Return student form
    return (
        <AuthorForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Author
        </AuthorForm>
    );
};

// Export EditStudent Component
export default EditAuthor;