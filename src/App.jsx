import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import AuthPage from "./pages/AuthPage";
import MyPosts from "./pages/MyPosts";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/my-posts/:userId" element={<MyPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
