import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import AuthorTableRow from "./AuthorTableRow";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";

const AuthorList = () => {
    const [Authors, setAuthors] = useState([]);
    const [searchText, setSearchText] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8080/authors/",  { params: { search: searchText } })
            .then(({ data }) => {
                setAuthors(data);
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
        return Authors.map((res, i) => {
            return <AuthorTableRow obj={res} key={i} />;
        });
    };

    return (
        <Fragment>
            <div className="table-wrapper" >
                <Link className="edit-link"
                      to={"/create-author"} >
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
                        <th>Name</th>
                        <th>Last name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{DataTable()}</tbody>
                </Table>
            </div>
        </Fragment>
    );
};

export default AuthorList;
