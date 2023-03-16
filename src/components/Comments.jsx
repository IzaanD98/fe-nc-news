import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CommentAdder from "./CommentAdder";
import { deleteCommentById } from "../utils/api";
import Alert from "react-bootstrap/Alert";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [failedDeletion, setFailedDeletion] = useState(false);
  const { article_id } = useParams();
  const [postedComment, setPostedComment] = useState(false);
  const [failedPostedComment, setFailedPostedComment] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    if (article_id) {
      setLoading(true);
      getCommentsByArticleId(article_id).then((data) => {
        setComments(data);
        setLoading(false);
      });
    }
  }, [article_id, newComment]);

  useEffect(() => {
    if (deleted || failedDeletion) {
      const timer = setTimeout(() => {
        setDeleted(false);
        setFailedDeletion(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [deleted, failedDeletion]);

  useEffect(() => {
    if (postedComment || failedPostedComment) {
      const timer = setTimeout(() => {
        setPostedComment(false);
        setFailedPostedComment(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [postedComment, failedPostedComment]);

  const deleteComment = (comment_id) => {
    setDeleting(true);
    deleteCommentById(comment_id)
      .then((data) => {
        setComments((currentComments) => {
          return currentComments.filter(
            (comment) => comment.comment_id !== comment_id
          );
        });
        setDeleting(false);
        setDeleted(true);
      })
      .catch(() => {
        setDeleting(false);
        setFailedDeletion(true);
      });
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }
  return (
    <div className="container my-5">
      <div className="row row-cols-1">
        <CommentAdder
          setComments={setComments}
          setNewComment={setNewComment}
          setPostedComment={setPostedComment}
          setFailedPostedComment={setFailedPostedComment}
        />
        {failedDeletion && (
          <Alert variant="danger">
            Failed to delete comment, please try again
          </Alert>
        )}
        {deleted && (
          <Alert variant="success">Successfully deleted Comment</Alert>
        )}
        {postedComment && (
          <Alert variant="success">Successfully posted comment</Alert>
        )}
        {failedPostedComment && (
          <Alert variant="danger">
            Failed to post comment, please try again
          </Alert>
        )}
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="col">
              <Card>
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <big className="font-weight-bold">{comment.author}</big>
                    {user.username === comment.author && (
                      <Button
                        onClick={() => deleteComment(comment.comment_id)}
                        style={{ float: "right" }}
                        className="button"
                        variant="warning"
                        disabled={deleting}
                      >
                        {deleting ? "Deleting" : "Delete"}
                      </Button>
                    )}
                    <br />
                    <small className="font-weight-bold">
                      {comment.created_at}
                    </small>
                  </div>
                  <Card.Text className="flex-grow-1">{comment.body}</Card.Text>
                  <div className="card-buttons">
                    <Button className="button" variant="secondary">
                      Upvote
                    </Button>
                    <Button
                      className="button"
                      variant={comment.votes > 0 ? "success" : "danger"}
                    >
                      {comment.votes}
                    </Button>
                    <Button className="button" variant="secondary">
                      Downvote
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
