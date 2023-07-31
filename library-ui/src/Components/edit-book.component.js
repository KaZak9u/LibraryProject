import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import { useParams } from 'react-router-dom'

const EditBook = (props) => {
    const [formValues, setFormValues] = useState({
        title: "",
        authorId: "",
    });
    const { id } = useParams()

//onSubmit handler
    const onSubmit = (studentObject) => {
        axios
            .patch(
                "http://localhost:8080/books/" +
                id,
                studentObject,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            )
            .then((res) => {
                if (res.status === 200) {
                    alert("Book successfully updated");
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong "+err));
    };

// Load data from server and reinitialize student form
    useEffect(() => {
        axios
            .get(
                "http://localhost:8080/books/"
                + id
            )
            .then((res) => {
                const { title, authorId} = res.data;
                setFormValues({ title, authorId });
            })
            .catch((err) => console.log(err));
    }, []);

// Return student form
    return (
        <BookForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Book
        </BookForm>
    );
};

// Export EditStudent Component
export default EditBook;
