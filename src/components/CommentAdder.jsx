import { postCommentForArticle } from "../utils/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserContext } from "../contexts/User";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentAdder({ setComments, setNewComment }) {
  const user = useContext(UserContext);
  const { article_id } = useParams();
  const [commentToAdd, setCommentToAdd] = useState("");

  const handleSumbit = (event) => {
    event.preventDefault();
    const newComment = {
      username: user.username,
      body: commentToAdd,
    };
    postCommentForArticle(article_id, newComment)
      .then((newCommentFromApi) => {
        setComments((currentComments) => {
          return [...currentComments, newCommentFromApi];
        });
        setNewComment({});
        alert("Comment has been posted");
      })
      .catch((error) => {
        alert("failed to post comment, please try again");
      });
  };

  const handleChange = (event) => {
    setCommentToAdd(event.target.value);
  };

  return (
    <Form onSubmit={handleSumbit}>
      <Form.Group className="mb-3" controlId="commentInput">
        <img className="user-icon" src={user.avatar_url} alt="user" />
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add comment"
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
