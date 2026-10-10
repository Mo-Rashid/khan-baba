import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Plus, Search, RefreshCw, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { communityApi, hasCommunityToken } from "./communityApi";
import CommunityPost from "./CommunityPost";
import CreatePost from "./CreatePost";

const categories = ["All", "Web Security", "Bug Bounty", "AI Security", "Mobile Security", "DevOps", "General"];

export default function CommunityPanel() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loggedIn = hasCommunityToken();

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await communityApi.list({
        category: category === "All" ? "" : category,
        search: search.trim(),
      });
      setPosts(result.posts || []);
    } catch (err) {
      setError(err.message || "Could not load community posts.");
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const timer = setTimeout(loadPosts, 250);
    return () => clearTimeout(timer);
  }, [loadPosts]);

  const onCreated = (post) => {
    setPosts((current) => [post, ...current.filter((item) => item._id !== post._id)]);
    setShowCreate(false);
  };

  return (
    <div className="vx-community-panel">
      <div className="vx-community-compose-row">
        <div><strong>Community discussions</strong><small>Public questions from learners</small></div>
        {loggedIn ? (
          <button className="vx-community-primary vx-community-small" onClick={() => setShowCreate((v) => !v)}>
            <Plus size={16} /> Ask
          </button>
        ) : (
          <Link className="vx-community-primary vx-community-small" to="/login"><LogIn size={15} /> Login</Link>
        )}
      </div>

      {showCreate && <CreatePost onCreated={onCreated} onCancel={() => setShowCreate(false)} />}

      <label className="vx-community-search">
        <Search size={17} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search problems..." />
      </label>

      <div className="vx-community-categories">
        {categories.map((item) => (
          <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>

      <div className="vx-community-feed">
        {loading && <div className="vx-community-state"><RefreshCw size={18} className="vx-community-spin" /> Loading discussions…</div>}
        {!loading && error && <div className="vx-community-state vx-community-error">{error}<button onClick={loadPosts}>Retry</button></div>}
        {!loading && !error && posts.length === 0 && (
          <div className="vx-community-empty"><MessageCircle size={30} /><strong>No discussions yet</strong><span>Be the first to share a problem with the community.</span></div>
        )}
        {!loading && !error && posts.map((post) => (
          <CommunityPost key={post._id} post={post} onChanged={loadPosts} />
        ))}
      </div>
      <footer className="vx-community-panel-footer"><span>🛡️ Be respectful. Never post passwords or private tokens.</span><button onClick={loadPosts} title="Refresh"><RefreshCw size={15} /></button></footer>
    </div>
  );
}