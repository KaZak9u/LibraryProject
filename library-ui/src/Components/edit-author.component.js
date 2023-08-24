// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import AuthorBootstrapForm from "./author-form.component";

const EditAuthor = (props) => {
    const [formValues, setFormValues] = useState({
        name: "",
        lastName: "",
    });
    const { id } = useParams()

    const onNameChange = (event) =>{
        setFormValues({...formValues, name: event.target.value})
    }
    const onLastNameChange = (event) =>{
        setFormValues({...formValues, lastName: event.target.value})
    }

//onSubmit handler
    const onSubmit = (event) => {
        if (id) {
            axios
                .patch(
                    "http://localhost:8080/authors/" +
                    id,
                    formValues,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                )
                .then((res) => {
                    if (res.status === 200) {
                        alert("Author successfully updated");
                    } else Promise.reject();
                })
                .catch((err) => alert("Something went wrong " + err));
        }
        else {
            axios.post(
                'http://localhost:8080/authors/',
                formValues,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(res => {
                    if (res.status === 200)
                        alert('Author successfully created')
                    else
                        Promise.reject()
                })
                .catch(err => alert('Something went wrong'))
        }
    };

// Load data from server and reinitialize student form
    useEffect(() => {
        if (id)
        {
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
    }}, [id]);

// Return student form
    return (
        <AuthorBootstrapForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
            onNameChange = {onNameChange}
            onLastNameChange = {onLastNameChange}
        >
            Update Author
        </AuthorBootstrapForm>
    );
};

// Export EditStudent Component
export default EditAuthor;
