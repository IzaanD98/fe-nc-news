import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Articles from "./components/Articles";
import { ThemeContext } from "./contexts/Theme";
import { useContext, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <Navigation articles={articles} />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Articles articles={articles} setArticles={setArticles} />}
        />
        <Route
          path="/articles/:article_id"
          element={<Articles articles={articles} setArticles={setArticles} />}
        />
        <Route
          path="/articles"
          element={<Articles articles={articles} setArticles={setArticles} />}
        />
      </Routes>
    </div>
  );
}

export default App;
