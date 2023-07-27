import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import AuthorTableRow from "./AuthorTableRow";

const AuthorList = () => {
    const [Authors, setAuthors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/authors/")
            .then(({ data }) => {
                setAuthors(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return Authors.map((res, i) => {
            return <AuthorTableRow obj={res} key={i} />;
        });
    };

    return (
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
    );
};

export default AuthorList;
