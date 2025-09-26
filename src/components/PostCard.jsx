import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const displayName = post.author_name ? post.author_name.split("@")[0] : "Anonymous";
  return (
    <div className="card">
      <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
      <p style={{ fontSize: "0.85rem", color: "#aaa" }}>by {displayName}</p>
      <p>{post.content.slice(0, 120)}...</p>
    </div>
  );
}
