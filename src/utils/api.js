import axios from "axios";

const articleAPI = axios.create({
  baseURL: "https://project-nc-news-db.onrender.com/api",
});

export const allArticles = () => {
  return articleAPI.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
