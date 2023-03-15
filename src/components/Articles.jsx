import { useEffect, useState } from "react";
import { allArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import { useParams, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();
  const query = useQuery();
  const topic = query.get("topic");

  useEffect(() => {
    setLoading(true);
    allArticles(article_id, topic).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [article_id, topic]);

  return (
    <main>
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <ArticleCard articles={articles} setArticles={setArticles} />
      )}
    </main>
  );
}
