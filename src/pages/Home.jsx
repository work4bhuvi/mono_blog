import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPosts();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (!error) setPosts(data);
  }

  async function createPost(e) {
    e.preventDefault();
    if (!user) return alert("Login to post!");
    await supabase.from("posts").insert([{ title, content, author_id: user.id, author_name: user.email }]);
    setTitle(""); setContent(""); fetchPosts();
  }

  return (
    <div className="container">
      <h1>Dark Mono Blog</h1>
      {user && (
        <form onSubmit={createPost} style={{ marginBottom: "2rem" }}>
          <input type="text" placeholder="Post title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
          <textarea rows="5" placeholder="Post content" value={content} onChange={(e)=>setContent(e.target.value)} required />
          <button type="submit">Post</button>
        </form>
      )}
      <div>{posts.map(post => <PostCard key={post.id} post={post} />)}</div>
    </div>
  );
}
