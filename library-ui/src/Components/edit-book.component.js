import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import BookBootstrapForm from "./book-form.component";

const EditBook = (props) => {
    const [formValues, setFormValues] = useState({
        title: "",
        authorId: ""
    });
    const [authors, setAuthors] = useState({})
    const { id } = useParams()

//onSubmit handler
    const onSubmit = (event) => {
        let body = {
            name: event.target.title.value,
            lastName: event.target.authorId.value
        };
        axios
            .patch(
                "http://localhost:8080/books/" +
                id,
                body,
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
                const title = res.data.title;
                const authorId = res.data.author.id;
                setFormValues({ title, authorId });
            })
            .catch((err) => console.log(err));
        axios
            .get(
                "http://localhost:8080/authors/"
            )
            .then((res) => {
                const authors = res.data;
                setAuthors({authors });
            })
            .catch((err) => console.log(err));
    }, []);

// Return student form
    return (
        <BookBootstrapForm
            initialValues={formValues}
            authorList={authors}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Book
        </BookBootstrapForm>
    );
};

// Export EditStudent Component
export default EditBook;
