import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => await supabase.auth.signOut();

  const displayName = user?.email ? user.email.split("@")[0] : null;

  return (
    <nav>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>MonoBlog</Link>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
        {user ? (
          <>
            <Link to={`/my-posts/${user.id}`} style={{ textDecoration: "underline" }}>{displayName}</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}
