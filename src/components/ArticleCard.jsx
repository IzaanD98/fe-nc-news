import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { voteForArticle } from "../utils/api";
import { useState } from "react";

export const ArticleCard = ({ articles, setArticles }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [articleWithError, setArticleWithError] = useState(null);
  const Vote = (id, number) => {
    setArticles((currentArticles) => {
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
        setArticleWithError(null);
      })
      .catch(() => {
        setErrorMessage("Failed to update vote count. Please try again later.");
        setArticleWithError(id);
        setArticles((currentArticles) => {
          return currentArticles.map((article) => {
            if (article.article_id === id) {
              return { ...article, votes: article.votes - number };
            }
            return article;
          });
        });
      });
  };
  return (
    <div className="container my-5">
      <p>
        {articles[0].total_count
          ? `Search results: ${articles[0].total_count}`
          : `Search results: ${articles.length}`}
      </p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {articles.map((article) => {
          return (
            <div key={article.article_id} className="col">
              <Card>
                <Card.Img
                  variant="top"
                  src={article.article_img_url}
                  alt={article.title}
                  className="card-img-top rounded-top"
                />
                <Card.Body
                  className="d-flex flex-column card-body-height"
                  id={"card-sizing"}
                >
                  <div className="mb-2 article-info">
                    <Link to={`/articles/${article.article_id}`}>
                      <Card.Title>
                        {article.title.length > 50 && articles.length > 1
                          ? `${article.title.slice(0, 65)}...`
                          : article.title}
                      </Card.Title>
                    </Link>
                    <div>
                      <Card.Text> {article.created_at}</Card.Text>
                      <Card.Text>Topic: {article.topic}</Card.Text>
                      <p className="font-weight-bold">
                        Posted By: {article.author}
                      </p>
                      <br />
                    </div>
                  </div>
                  <div className="card-buttons">
                    <Button
                      onClick={() => Vote(article.article_id, 1)}
                      variant="secondary"
                    >
                      Upvote
                    </Button>
                    <Button variant={article.votes >= 0 ? "success" : "danger"}>
                      {article.votes}
                    </Button>
                    <Button
                      onClick={() => Vote(article.article_id, -1)}
                      variant="secondary"
                    >
                      Downvote
                    </Button>
                  </div>
                  {errorMessage && articleWithError === article.article_id && (
                    <span className="text-danger">{errorMessage}</span>
                  )}
                  <br />
                  <div className="card-buttons">
                    <Link to={`/articles/${article.article_id}`}>
                      <Button variant="primary" className="me-2">
                        View Comments ({article.comment_count})
                      </Button>
                    </Link>
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
