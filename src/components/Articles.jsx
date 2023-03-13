import { useEffect, useState } from "react";
import { allArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import { useParams } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();
  useEffect(() => {
    setLoading(true);
    allArticles(article_id).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [article_id]);

  return (
    <main>
      {loading ? <h2>Loading....</h2> : <ArticleCard articles={articles} />}
    </main>
  );
}
