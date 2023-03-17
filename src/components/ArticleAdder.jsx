import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postArticle } from "../utils/api";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

export default function ArticleAdder({ topics, setArticles }) {
  const [newtitle, setNewTitle] = useState("");
  const [topicAdd, setTopicAdd] = useState("");
  const [bodyAdd, setBodyAdd] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");
  const [postedArticle, setPostedArticle] = useState(false);
  const [failedPost, setFailedPost] = useState(false);
  const [postingArticle, setPostingArticle] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSumbit = (event) => {
    event.preventDefault();
    setPostingArticle(true);
    const newArticle = {
      author: user.username,
      title: newtitle,
      body: bodyAdd,
      topic: topicAdd,
      article_img_url: articleImgUrl,
    };
    postArticle(newArticle)
      .then((newArticleFromApi) => {
        setArticles((currentArticles) => {
          return [...currentArticles, newArticleFromApi];
        });
        setNewTitle("");
        setTopicAdd("");
        setBodyAdd("");
        setArticleImgUrl("");
        setPostingArticle(false);
        setPostedArticle(true);
        navigate("/");
      })
      .catch((error) => {
        setPostingArticle(false);
        setFailedPost(true);
      });
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopicAdd(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyAdd(event.target.value);
  };

  const handleArticleImgUrlChange = (event) => {
    setArticleImgUrl(event.target.value);
  };

  useEffect(() => {
    if (postedArticle || failedPost) {
      const timer = setTimeout(() => {
        setFailedPost(false);
        setPostedArticle(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [failedPost, postedArticle]);

  return (
    <Form onSubmit={handleSumbit}>
      <div className="form-center">
        <div className="form-group">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              onChange={handleTitleChange}
            />
          </Form.Group>
        </div>
        <div className="form-group">
          <label htmlFor="Topic">
            Topic
            <Form.Select onChange={handleTopicChange} id="Topic" size="md">
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
        <div className="form-group">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Body"
              required
              onChange={handleBodyChange}
            />
          </Form.Group>
        </div>
        <div className="form-group">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Article Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Img Url"
              required
              onChange={handleArticleImgUrlChange}
            />
          </Form.Group>
        </div>
        <div className="form-group">
          <Button variant="primary" type="submit" disabled={postingArticle}>
            {postingArticle ? "Posting" : "Submit"}
          </Button>
          {postedArticle && <Alert variant="success">Article posted</Alert>}
          {failedPost && <Alert variant="danger">Failed to post article</Alert>}
        </div>
      </div>
    </Form>
  );
}
