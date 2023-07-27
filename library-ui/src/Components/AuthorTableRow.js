import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorTableRow = (props) => {
    const { id, name, lastName } = props.obj;

    const deleteAuthor = () => {
        axios
            .delete(
                "http://localhost:8080/authors/" + id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Author successfully deleted");
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{lastName}</td>
            <td>
                <Link className="edit-link"
                      to={"/edit-Author/" + id}>
                    Edit
                </Link>
                <Button onClick={deleteAuthor}
                        size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default AuthorTableRow;
