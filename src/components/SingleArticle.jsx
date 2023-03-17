import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { voteForArticle } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../utils/api";
import { deleteArticleById } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

export const SingleArticle = ({ setIsSingleArticle }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
        setIsSingleArticle(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [article_id, setIsSingleArticle]);

  const Vote = (id, number) => {
    setArticle((currentArticles) => {
      return currentArticles.map((article) => {
        if (article.article_id === id) {
          return { ...article, votes: article.votes + number };
        }
        return article;
      });
    });
    voteForArticle(id, number)
      .then(() => {
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Failed to update vote count. Please try again later.");
        setArticle((currentArticles) => {
          return currentArticles.map((article) => {
            if (article.article_id === id) {
              return { ...article, votes: article.votes - number };
            }
            return article;
          });
        });
      });
  };

  const handleDelete = (article_id) => {
    const result = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (result) {
      setDeleting(true);
      deleteArticleById(article_id)
        .then((data) => {
          setDeleting(false);
          alert("Successfully Deleted Article");
          navigate("/");
        })
        .catch((error) => {
          setDeleting(false);
          alert("Failed to delete article, please try again");
        });
    }
  };

  if (error) {
    return (
      <h2 className="text-center" style={{ color: "red" }}>
        {error.response.data.message}
      </h2>
    );
  }
  if (loading) {
    return <h2 className="loading">Loading....</h2>;
  }

  return (
    <div className="container my-5">
      <div className="row row-cols-md-2 justify-content-center">
        {article.map((a) => {
          return (
            <div key={a.article_id} className="col">
              <Card>
                <Card.Img
                  variant="top"
                  src={a.article_img_url}
                  alt={a.title}
                  className="card-img-top rounded-top"
                />
                <Card.Body className="d-flex flex-column card-body-height">
                  <div className="mb-2 article-info">
                    <Link to={`/articles/${a.article_id}`}>
                      <Card.Title>{a.title}</Card.Title>
                    </Link>
                    <div>
                      <Card.Text> {a.created_at}</Card.Text>
                      <Card.Text>Topic: {a.topic}</Card.Text>
                      <p className="font-weight-bold">Posted By: {a.author}</p>
                      <br />
                    </div>
                    <div className="card-buttons">
                      {user.username === a.author && (
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(a.article_id)}
                          disabled={deleting}
                        >
                          {deleting ? "Deleting" : "Delete"}
                        </Button>
                      )}
                    </div>
                  </div>
                  <Card.Text className="flex-grow-1">{a.body}</Card.Text>
                  <div className="card-buttons">
                    <Button
                      onClick={() => Vote(a.article_id, 1)}
                      variant="secondary"
                    >
                      Upvote
                    </Button>
                    <Button variant={a.votes >= 0 ? "success" : "danger"}>
                      {a.votes}
                    </Button>
                    <Button
                      onClick={() => Vote(a.article_id, -1)}
                      variant="secondary"
                    >
                      Downvote
                    </Button>
                  </div>
                  {errorMessage && (
                    <span className="text-danger">{errorMessage}</span>
                  )}
                  <br />
                  <div className="card-buttons">
                    <Link to={`/articles/${article_id}`}>
                      <Button variant="primary" className="me-2">
                        Comments ({a.comment_count})
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Comments />
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
