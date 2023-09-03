import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import BookTableRow from "./BookTableRow";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";

const BookList = () => {
    const [Books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8080/books/", { params : { search: searchText } })
            .then(({ data }) => {
                setBooks(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchText]);

    const onSearchBarChange = (event) => {
        let mySearchText = event.target.value;
        if (mySearchText.length > 2)
        {
            setSearchText(mySearchText);
        }
        else
        {
            setSearchText(null);
        }
    }

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
            <div className="searchBar" >
                <Form.Label>Search </Form.Label>
                <Form.Control type="text" placeholder="Wyszukaj" onChange={onSearchBarChange} />
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