import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import { getAllTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";

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

  const user = useContext(UserContext);

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
              <Nav.Item>
                <div className="nav-link">
                  <label htmlFor="Sort_By">
                    Sort By
                    <Form.Select
                      onChange={handleSort}
                      id="Sort_By"
                      value={selectedSort}
                      size="md"
                    >
                      <option>none</option>
                      <option value="comment_count">comment count</option>
                      <option value="created_at">date</option>
                      <option value="votes">votes</option>
                    </Form.Select>
                  </label>
                </div>
              </Nav.Item>
            )}

            {isSingleArticle === false && (
              <Nav.Item>
                <div className="nav-link">
                  <label htmlFor="Order">
                    Order
                    <Form.Select
                      onChange={handleOrder}
                      id="Order"
                      value={selectedOrder}
                      size="md"
                    >
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </Form.Select>
                  </label>
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
