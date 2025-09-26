import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
    if (!error) {
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
    }
  }

  const isAuthor = user?.id === post?.author_id;

  async function deletePost() {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("Failed to delete post: " + error.message);
    else {
      alert("Post deleted successfully!");
      navigate("/");
    }
  }

  async function saveEdit() {
    const { error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id);
    if (error) alert("Failed to update post: " + error.message);
    else {
      alert("Post updated successfully!");
      setIsEditing(false);
      fetchPost();
    }
  }

  if (!post) return <p className="container">Loading...</p>;

  const displayName = post.author_name ? post.author_name.split("@")[0] : "Anonymous";

  return (
    <div className="container">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          <textarea
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          <button onClick={saveEdit} style={{ marginRight: "0.5rem" }}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p style={{ fontSize: "0.85rem", color: "#aaa" }}>by {displayName}</p>
          <pre style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#1a1a1a",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #333",
            color: "#e0e0e0"
          }}>{post.content}</pre>

          {isAuthor && (
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
              <button onClick={() => setIsEditing(true)} style={{ backgroundColor: "#3498db", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                Edit
              </button>
              <button onClick={deletePost} style={{ backgroundColor: "#e74c3c", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
