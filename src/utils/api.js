import axios from "axios";

const articleAPI = axios.create({
  baseURL: "https://project-nc-news-db.onrender.com/api",
});

export const allArticles = (article_id, topic) => {
  let url = article_id ? `/articles/${article_id}` : "/articles";
  if (topic) {
    url = `/articles?topic=${topic}`;
  }
  return articleAPI.get(url).then(({ data }) => {
    return data.articles;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return articleAPI
    .get(`/articles/${article_id}/comments?limit=100`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const voteForArticle = (article_id, number) => {
  return articleAPI
    .patch(`/articles/${article_id}`, { inc_votes: number })
    .then(({ data }) => {
      return data.article;
    });
};

export const postCommentForArticle = (article_id, comment) => {
  return articleAPI
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data }) => {
      return data.newItem;
    });
};

export const getAllTopics = () => {
  return articleAPI.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
