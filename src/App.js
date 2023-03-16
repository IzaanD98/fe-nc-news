import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Articles from "./components/Articles";
import { SingleArticle } from "./components/SingleArticle";
import { ThemeContext } from "./contexts/Theme";
import { useContext, useState } from "react";

function App() {
  const { theme } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [isSingleArticle, setIsSingleArticle] = useState("false");

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
      />
      <Header
        setSelectedOrder={setSelectedOrder}
        setSelectedSort={setSelectedSort}
        setSelectedTopic={setSelectedTopic}
      />
      <Routes>
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
      </Routes>
    </div>
  );
}

export default App;
