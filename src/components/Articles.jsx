import { useEffect, useState } from "react";
import { allArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    allArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      {loading ? <h2>Loading....</h2> : <ArticleCard articles={articles} />}
    </main>
  );
}
