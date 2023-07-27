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
