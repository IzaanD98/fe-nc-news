import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Articles from "./components/Articles";
import { SingleArticle } from "./components/SingleArticle";
import { ThemeContext } from "./contexts/Theme";
import { useContext, useState } from "react";
import Footer from "./components/Footer";
import TopicAdder from "./components/TopicAdder";
import ArticleAdder from "./components/ArticleAdder";

function App() {
  const { theme } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [isSingleArticle, setIsSingleArticle] = useState("false");
  const [post, setPost] = useState("");
  const [topics, setTopics] = useState([]);

  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <Navigation
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        isSingleArticle={isSingleArticle}
        post={post}
        setPost={setPost}
        setIsSingleArticle={setIsSingleArticle}
        topics={topics}
        setTopics={setTopics}
      />
      <Header
        setSelectedOrder={setSelectedOrder}
        setSelectedSort={setSelectedSort}
        setSelectedTopic={setSelectedTopic}
        setPost={setPost}
      />
      <Routes>
        <Route
          path="/*"
          element={<h2 className="text-center">404 page not found!</h2>}
        />
        <Route
          path="/"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              setIsSingleArticle={setIsSingleArticle}
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={<SingleArticle setIsSingleArticle={setIsSingleArticle} />}
        />
        <Route
          path="/articles"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              setIsSingleArticle={setIsSingleArticle}
            />
          }
        />
        <Route
          path="/post/topic"
          element={<TopicAdder setTopics={setTopics} />}
        />
        <Route
          path="/post/article"
          element={<ArticleAdder topics={topics} setArticles={setArticles} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
