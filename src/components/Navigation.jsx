import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getAllTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  const handleSelect = (event) => {
    if (event.target.value) {
      navigate(`articles?topic=${event.target.value}`);
    }
  };
  const user = useContext(UserContext);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link>
                <Form.Select onChange={handleSelect} size="md">
                  <option disabled>Filter</option>
                  {topics.map((topic) => {
                    return (
                      <option key={topic.slug} value={topic.slug}>
                        {topic.slug}
                      </option>
                    );
                  })}
                </Form.Select>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
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
