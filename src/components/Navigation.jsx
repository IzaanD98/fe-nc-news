import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import { getAllTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function SortingButtons({
  selectedSort,
  setSelectedSort,
  selectedOrder,
  setSelectedOrder,
}) {
  const navigate = useNavigate();

  const handleClick = (sort) => {
    let newOrder = "asc";
    if (selectedSort === sort && selectedOrder === "asc") {
      newOrder = "desc";
    }
    setSelectedSort(sort);
    setSelectedOrder(newOrder);

    let sortQuery = `?sort_by=${sort}&order=${newOrder}`;
    navigate(`/articles${sortQuery}`);
  };

  const getButtonVariant = (sort) => {
    return selectedSort === sort ? "primary" : "outline-primary";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p style={{ color: "grey", margin: 0 }}>Sort By:</p>

      <ButtonGroup>
        <Button
          style={{ color: "white" }}
          variant={getButtonVariant("comment_count")}
          onClick={() => handleClick("comment_count")}
        >
          Comment Count
        </Button>
        <Button
          style={{ color: "white" }}
          variant={getButtonVariant("created_at")}
          onClick={() => handleClick("created_at")}
        >
          Date
        </Button>
        <Button
          style={{ color: "white" }}
          variant={getButtonVariant("votes")}
          onClick={() => handleClick("votes")}
        >
          Votes
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default function Navigation({
  selectedTopic,
  setSelectedTopic,
  selectedSort,
  setSelectedSort,
  selectedOrder,
  setSelectedOrder,
  isSingleArticle,
  post,
  setPost,
  setIsSingleArticle,
  topics,
  setTopics,
  setSearch,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics().then((data) => {
      setTopics(data);
    });
  }, [setTopics]);

  const handleSelect = (event) => {
    setSelectedTopic(event.target.value);
    if (event.target.value === "All") {
      navigate(`/`);
    } else {
      navigate(`articles?topic=${event.target.value}`);
    }
    setPost("");
    setSelectedSort("");
    setSelectedOrder("");
  };

  const handleSort = (event) => {
    const newSortValue = event.target.value;
    setSelectedSort(newSortValue);

    if (newSortValue === "none") {
      if (selectedTopic && selectedTopic !== "All") {
        navigate(`/articles?topic=${selectedTopic}`);
      } else {
        navigate(`/articles`);
      }
    } else {
      if (selectedTopic && selectedTopic !== "All") {
        navigate(`articles?topic=${selectedTopic}&sort_by=${newSortValue}`);
      } else {
        navigate(`/articles?sort_by=${newSortValue}`);
      }
    }
    setPost("");
    setSelectedOrder("");
  };

  const handleOrder = (event) => {
    setSelectedOrder(event.target.value);
    if (selectedSort && selectedTopic === "All") {
      navigate(`/articles?sort_by=${selectedSort}&order=${event.target.value}`);
    } else if (selectedSort && selectedTopic) {
      navigate(
        `articles?topic=${selectedTopic}&sort_by=${selectedSort}&order=${event.target.value}`
      );
    } else if (selectedSort && !selectedTopic) {
      navigate(`/articles?sort_by=${selectedSort}&order=${event.target.value}`);
    } else {
      navigate(`/articles?order=${event.target.value}`);
    }
    setPost("");
  };

  const handlePost = (event) => {
    setPost(event.target.value);
    if (event.target.value === "add-article") {
      navigate("/post/article");
    } else if (event.target.value === "add-topic") {
      navigate("/post/topic");
    }
    setIsSingleArticle(true);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  const handleUser = () => {
    navigate("/user");
  };

  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {isSingleArticle === false && (
              <Nav.Item>
                <div className="nav-link">
                  <label htmlFor="Topic">
                    Topic
                    <Form.Select
                      onChange={handleSelect}
                      id="Topic"
                      value={selectedTopic}
                      size="md"
                    >
                      <option value="All">All</option>
                      {topics.map((topic) => {
                        return (
                          <option key={topic.slug} value={topic.slug}>
                            {topic.slug}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </label>
                </div>
              </Nav.Item>
            )}
            {isSingleArticle === false && (
              <SortingButtons
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
              />
            )}
            {isSingleArticle === false && (
              <Nav.Item>
                <div className="nav-link" style={{ marginTop: "20px" }}>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Nav.Item>
            )}
            <Nav.Item>
              <div className="nav-link">
                <label htmlFor="Post">
                  Post
                  <Form.Select
                    onChange={handlePost}
                    id="Order"
                    size="md"
                    value={post}
                  >
                    <option>Select</option>
                    <option value="add-article">Post article</option>
                    <option value="add-topic">Post topic</option>
                  </Form.Select>
                </label>
              </div>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link>
                <ToggleTheme />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="user-info">
              <Nav.Link onClick={handleUser}>
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
