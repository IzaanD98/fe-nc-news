import { Link } from "react-router-dom";
export default function Header({
  setSelectedOrder,
  setSelectedSort,
  setSelectedTopic,
  setPost,
}) {
  const handleClick = () => {
    setSelectedOrder("");
    setSelectedSort("");
    setSelectedTopic("");
    setPost("");
  };

  return (
    <div className="text-center">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 onClick={handleClick} className="title">
          InsightCorner
        </h1>
      </Link>
    </div>
  );
}
