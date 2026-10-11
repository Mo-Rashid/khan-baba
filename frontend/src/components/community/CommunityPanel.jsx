
import { useCallback, useEffect, useState } from "react";
import {
  Users,
  MessageCircle,
  Plus,
  RefreshCw,
} from "lucide-react";
import { communityApi, hasCommunityToken } from "./communityApi";
import CreatePost from "./CreatePost";
import CommunityPost from "./CommunityPost";
import "./community.css";

export default function CommunityPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState("");

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await communityApi.list();
      setPosts(Array.isArray(result.posts) ? result.posts : []);
    } catch (err) {
      setError(err.message || "Unable to load community posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  async function handleCreated(post) {
    setShowCreate(false);

    if (post) {
      setPosts((current) => [
        post,
        ...current.filter(
          (item) =>
            String(item._id || item.id) !==
            String(post._id || post.id)
        ),
      ]);
    } else {
      await loadPosts();
    }
  }

  return (
    <section className="vx-community">
      <header className="vx-community-header">
        <div className="vx-community-brand">
          <div className="vx-community-logo">
            <Users size={25} />
          </div>

          <div>
            <h2>VulnXploit Community</h2>
            <p>
              Ask questions, share knowledge, and solve security challenges.
            </p>
          </div>
        </div>

        <button
          className="vx-community-primary"
          type="button"
          onClick={() => setShowCreate((value) => !value)}
        >
          <Plus size={17} />
          {showCreate ? "Close" : "Create Post"}
        </button>
      </header>

      <div className="vx-community-stats">
        <div className="vx-community-stat-item">
          <MessageCircle size={20} />
          <div>
            <strong>{posts.length}</strong>
            <span>Posts loaded</span>
          </div>
        </div>

        <button
          className="vx-community-refresh"
          type="button"
          onClick={loadPosts}
          disabled={loading}
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {showCreate && (
        <CreatePost
          onCreated={handleCreated}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {!hasCommunityToken() && (
        <div className="vx-community-note">
          Sign in to publish posts, reply to discussions, and like posts.
        </div>
      )}

      {error && (
        <div className="vx-community-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={loadPosts}>
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="vx-community-empty">
          Loading community discussions...
        </div>
      ) : posts.length === 0 && !error ? (
        <div className="vx-community-empty">
          <MessageCircle size={36} />
          <h3>No discussions yet</h3>
          <p>Be the first to start a security discussion.</p>

          <button
            className="vx-community-primary"
            type="button"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={16} />
            Create first post
          </button>
        </div>
      ) : (
        <div className="vx-community-feed">
          {posts.map((post) => (
            <CommunityPost
              key={post._id || post.id}
              post={post}
              onChanged={loadPosts}
            />
          ))}
        </div>
      )}
    </section>
  );
}
