import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import BookTableRow from "./BookTableRow";
import {Link} from "react-router-dom";

const BookList = () => {
    const [Books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/books/")
            .then(({ data }) => {
                setBooks(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return Books.map((res, i) => {
            return <BookTableRow obj={res} key={i} />;
        });
    };

    return (
        <Fragment>
            <div className="table-wrapper" >
                <Link className="edit-link"
                      to={"/create-book"} >
                    Create
                </Link>
            </div>
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author name</th>
                        <th>Author last name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{DataTable()}</tbody>
                </Table>
            </div>
        </Fragment>
    );
};

export default BookList;