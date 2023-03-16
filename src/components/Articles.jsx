import { useEffect, useState } from "react";
import { allArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import { useParams, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Articles({
  articles,
  setArticles,
  setIsSingleArticle,
}) {
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();
  const query = useQuery();
  const topic = query.get("topic");
  const sort_by = query.get("sort_by");
  const order = query.get("order");
  const limit = query.get("limit");

  useEffect(() => {
    setLoading(true);
    allArticles(topic, sort_by, order, limit).then((data) => {
      setArticles(data);
      setIsSingleArticle(false);
      setLoading(false);
    });
  }, [
    article_id,
    topic,
    sort_by,
    order,
    limit,
    setArticles,
    setIsSingleArticle,
  ]);

  return (
    <main>
      {loading ? (
        <h2 className="loading">Loading....</h2>
      ) : (
        <ArticleCard articles={articles} setArticles={setArticles} />
      )}
    </main>
  );
}
