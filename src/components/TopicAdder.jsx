import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postTopic } from "../utils/api";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export default function TopicAdder({ setTopics }) {
  const [topicToAdd, setTopicToAdd] = useState("");
  const [descToAdd, setDescToAdd] = useState("");
  const [postedTopic, setPostedTopic] = useState(false);
  const [failedPost, setFailedPost] = useState(false);
  const [postingTopic, setPostingTopic] = useState(false);

  const handleSumbit = (event) => {
    event.preventDefault();
    setPostingTopic(true);
    const newTopic = {
      slug: topicToAdd,
      description: descToAdd,
    };
    postTopic(newTopic)
      .then((newTopicFromApi) => {
        setTopics((currentTopics) => {
          return [...currentTopics, newTopicFromApi];
        });
        setTopicToAdd("");
        setDescToAdd("");
        setPostingTopic(false);
        setPostedTopic(true);
      })
      .catch((error) => {
        setPostingTopic(false);
        setFailedPost(true);
      });
  };

  const handleTopicChange = (event) => {
    setTopicToAdd(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescToAdd(event.target.value);
  };

  useEffect(() => {
    if (postedTopic || failedPost) {
      const timer = setTimeout(() => {
        setFailedPost(false);
        setPostedTopic(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [failedPost, postedTopic]);

  return (
    <Form onSubmit={handleSumbit}>
      <div className="form-center">
        <div className="form-group">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              onChange={handleTopicChange}
            />
          </Form.Group>
        </div>
        <div className="form-group">
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              required
              onChange={handleDescChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={postingTopic}>
            {postingTopic ? "Posting" : "Submit"}
          </Button>
          {postedTopic && <Alert variant="success">Topic posted</Alert>}
          {failedPost && <Alert variant="danger">Failed to post topic</Alert>}
        </div>
      </div>
    </Form>
  );
}
