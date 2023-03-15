import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CommentAdder from "./CommentAdder";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    if (article_id) {
      setLoading(true);
      getCommentsByArticleId(article_id).then((data) => {
        setComments(data);
        setLoading(false);
      });
    }
  }, [article_id, newComment]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container my-5">
      <div className="row row-cols-1">
        <CommentAdder setComments={setComments} setNewComment={setNewComment} />
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="col">
              <Card>
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <big className="font-weight-bold">{comment.author}</big>
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
