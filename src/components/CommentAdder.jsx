import { postCommentForArticle } from "../utils/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserContext } from "../contexts/User";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentAdder({
  setComments,
  setNewComment,
  setPostedComment,
  setFailedPostedComment,
}) {
  const user = useContext(UserContext);
  const { article_id } = useParams();
  const [commentToAdd, setCommentToAdd] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const handleSumbit = (event) => {
    event.preventDefault();
    setPostingComment(true);
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
        setPostingComment(false);
        setPostedComment(true);
      })
      .catch((error) => {
        setPostingComment(false);
        setFailedPostedComment(true);
      });
  };

  const handleChange = (event) => {
    setCommentToAdd(event.target.value);
  };

  return (
    <Form onSubmit={handleSumbit}>
      <Form.Group className="mb-3" controlId="commentInput">
        <section>
          <img
            style={{ float: "left", marginBottom: "10px" }}
            className="user-icon"
            src={user.avatar_url}
            alt="user"
          />
        </section>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add comment"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button
        style={{ float: "right", marginBottom: "10px" }}
        variant="primary"
        type="submit"
        disabled={postingComment}
      >
        {postingComment ? "Posting..." : "Submit"}
      </Button>
    </Form>
  );
}
