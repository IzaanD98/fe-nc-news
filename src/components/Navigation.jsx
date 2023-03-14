import { useContext } from "react";
import { UserContext } from "../contexts/User";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Navigation() {
  const user = useContext(UserContext);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link>
                <Form.Select size="md">
                  <option>Filter</option>
                  <option>Cooking</option>
                  <option>Coding</option>
                  <option>Eating</option>
                </Form.Select>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <InputGroup size="md">
                  <InputGroup.Text id="inputGroup-sizing-lg">
                    Search
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="user-info">
              <Nav.Link>
                <span>Logged in as:</span>
                <br />
                <img className="user-icon" src={user.avatar_url} alt="user" />
                <p>{user.username}</p>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
