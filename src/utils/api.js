import axios from "axios";

const articleAPI = axios.create({
  baseURL: "https://project-nc-news-db.onrender.com/api",
});

export const allArticles = (topic, sort_by, order, limit) => {
  let url = `/articles?${topic ? "topic=" + topic : ""}${
    sort_by ? "&sort_by=" + sort_by : ""
  }${order ? "&order=" + order : ""}${limit ? "&limit=" + limit : ""}`;

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

export const getSingleArticle = (article_id) => {
  return articleAPI.get(`/articles/${article_id}`).then(({ data }) => {
    return data.articles;
  });
};

export const deleteCommentById = (comment_id) => {
  return articleAPI.delete(`/comments/${comment_id}`).then(({ data }) => {
    return data.articles;
  });
};

export const voteForComment = (comment_id, number) => {
  return articleAPI
    .patch(`/comments/${comment_id}`, { inc_votes: number })
    .then(({ data }) => {
      return data.comments;
    });
};

export const deleteArticleById = (article_id) => {
  return articleAPI.delete(`/articles/${article_id}`).then(({ data }) => {
    return data.articles;
  });
};

export const postTopic = (topic) => {
  return articleAPI.post(`/topics`, topic).then(({ data }) => {
    return data.newTopic;
  });
};

export const postArticle = (article) => {
  return articleAPI.post(`/articles`, article).then(({ data }) => {
    return data.newArticle;
  });
};

export const getUsers = () => {
  return articleAPI.get(`/users`).then(({ data }) => {
    return data.users;
  });
};

export const getUserInfo = (username) => {
  return articleAPI.get(`/users/${username}`).then(({ data }) => {
    return data.users;
  });
};
