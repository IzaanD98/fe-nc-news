import { useContext } from "react";
import { UserContext } from "../contexts/User";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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
                <select>
                  <option>Filter</option>
                  <option>Cooking</option>
                  <option>Coding</option>
                  <option>Eating</option>
                </select>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <input type="text" placeholder="Search" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="user-info">
              <Nav.Link>
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
