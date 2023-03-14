import axios from "axios";

const articleAPI = axios.create({
  baseURL: "https://project-nc-news-db.onrender.com/api",
});

export const allArticles = (article_id) => {
  const url = article_id ? `/articles/${article_id}` : "/articles";
  return articleAPI.get(url).then(({ data }) => {
    return data.articles;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return articleAPI.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
