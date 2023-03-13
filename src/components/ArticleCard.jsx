import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const ArticleCard = ({ articles }) => {
  return (
    <div className="container my-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {articles.map((article) => {
          return (
            <div key={article.id} className="col">
              <Card className="h-100 border-0 shadow">
                <Card.Img
                  variant="top"
                  src={article.article_img_url}
                  className="card-img-top rounded-top"
                />
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Card.Title>{article.title}</Card.Title>
                    <small className="font-weight-bold">
                      Posted By: {article.author}
                    </small>
                  </div>
                  <Card.Text>Topic: {article.topic}</Card.Text>
                  <Card.Text className="flex-grow-1">
                    ID: {article.article_id}
                  </Card.Text>
                  <div>
                    <Button variant="primary" className="me-2">
                      View Comments ({article.comment_count})
                    </Button>
                    <Button variant="secondary">
                      Upvote ({article.votes})
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
};
