import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="text-center">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="title">InsightCorner</h1>
      </Link>
    </div>
  );
}
