// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
  from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes,
  Route, Link } from "react-router-dom";


import AuthorList from "./Components/author-list.component";
import BookList from "./Components/book-list.component";
import EditAuthor from "./Components/edit-author.component";
import EditBook from "./Components/edit-book.component";
// App Component
const App = () => {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand>
                  <Link to={"/"}
                        className="nav-link">
                    Library app
                  </Link>
                </Navbar.Brand>

                <Nav className="justify-content-end">
                  <Nav>
                    <Link to={"/author-list"}
                          className="nav-link">
                      Author List
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to={"/book-list"}
                          className="nav-link">
                      Book List
                    </Link>
                  </Nav>
                </Nav>

              </Container>
            </Navbar>
          </header>

          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Routes>
                    <Route exact path="/"
                           element={<AuthorList/>} />
                    <Route path="/author-list"
                           element={<AuthorList/>} />
                    <Route path="/edit-author/:id"
                           element={<EditAuthor/>} />
                    <Route path="/create-author"
                           element={<EditAuthor/>} />
                    <Route path="/book-list"
                           element={<BookList/>} />
                    <Route path="/edit-book/:id"
                           element={<EditBook/>} />
                    <Route path="/create-book"
                           element={<EditBook/>} />
                  </Routes>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
  );
};

export default App;
