import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const BookTableRow = (props) => {
    const { id, title, author } = props.obj;

    const deleteBook = () => {
        axios
            .delete(
                "http://localhost:8080/books/" + id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Book successfully deleted");
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (
        <tr>
            <td>{title}</td>
            <td>{author.name}</td>
            <td>{author.lastName}</td>
            <td>
                <Link className="edit-link"
                      to={"/edit-book/" + id}>
                    Edit
                </Link>
                <Button onClick={deleteBook}
                        size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default BookTableRow;