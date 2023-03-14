import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Comments from "./Comments";

export const ArticleCard = ({ articles }) => {
  return (
    <div className="container my-5">
      <div
        className={
          articles.length > 1
            ? "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
            : "row row-cols-md-2 justify-content-center"
        }
      >
        {articles.map((article) => {
          return (
            <div key={article.article_id} className="col">
              <Card>
                <Card.Img
                  variant="top"
                  src={article.article_img_url}
                  className="card-img-top rounded-top"
                />
                <Card.Body className="d-flex flex-column card-body-height">
                  <div className="mb-2">
                    <Link to={`/articles/${article.article_id}`}>
                      <Card.Title>{article.title}</Card.Title>
                    </Link>
                    <small className="font-weight-bold">
                      Posted By: {article.author}
                    </small>
                  </div>
                  <Card.Text>Topic: {article.topic}</Card.Text>
                  <Card.Text className="flex-grow-1">{article.body}</Card.Text>
                  <div className="card-buttons">
                    <Button variant="secondary">Upvote</Button>
                    <Button variant={article.votes >= 0 ? "success" : "danger"}>
                      {article.votes}
                    </Button>
                    <Button variant="secondary">Downvote</Button>
                  </div>
                  <br />
                  <br />
                  <div className="card-buttons">
                    <Link to={`/articles/${article.article_id}`}>
                      <Button variant="primary" className="me-2">
                        {articles.length === 1 ? "Comments" : "View Comments"} (
                        {article.comment_count})
                      </Button>
                    </Link>
                  </div>
                  <div>{articles.length === 1 && <Comments />}</div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
