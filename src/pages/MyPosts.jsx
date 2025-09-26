import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import PostCard from "../components/PostCard";

export default function MyPosts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("author_id", userId)
      .order("created_at", { ascending: false });
    if (!error) setPosts(data);
  }

  return (
    <div className="container">
      <h1>My Posts</h1>
      {posts.length === 0 ? (
        <p>You haven't posted anything yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
