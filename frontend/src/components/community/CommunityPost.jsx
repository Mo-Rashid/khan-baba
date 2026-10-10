import { useState } from "react";
import { MessageCircle, Heart, CheckCircle2, Flag, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { communityApi, hasCommunityToken } from "./communityApi";
import CommunityReplies from "./CommunityReplies";
import { Link } from "react-router-dom";

function displayName(user) {
  if (!user) return "Community member";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.name || "Community member";
}

export default function CommunityPost({ post, onChanged }) {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const authorId = post.author?._id || post.author?.id || post.author;
  const isOwner = Boolean(post.currentUserIsOwner);
  const replies = post.replies || [];

  async function like() {
    if (!hasCommunityToken()) return setError("Please log in to like a post.");
    setBusy(true); setError("");
    try { await communityApi.toggleLike(post._id); await onChanged?.(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function report() {
    if (!hasCommunityToken()) return setError("Please log in to report a post.");
    const reason = window.prompt("Why are you reporting this post?");
    if (!reason?.trim()) return;
    setBusy(true); setError("");
    try { await communityApi.report(post._id, reason.trim()); setError("Report submitted for moderator review."); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!window.confirm("Delete this post and its replies?")) return;
    setBusy(true); setError("");
    try { await communityApi.remove(post._id); await onChanged?.(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return (
    <article className="vx-community-post">
      <div className="vx-community-post-meta">
        <span className="vx-community-avatar">{displayName(post.author).charAt(0).toUpperCase()}</span>
        <div className="vx-community-author"><strong>{displayName(post.author)}</strong><small>{new Date(post.createdAt).toLocaleString()} · {post.category}</small></div>
        {post.isSolved && <span className="vx-community-solved"><CheckCircle2 size={13} /> Solved</span>}
      </div>
      <h3>{post.title}</h3>
      <p className="vx-community-post-description">{post.description}</p>
      <div className="vx-community-post-actions">
        <button onClick={like} disabled={busy} title="Like"><Heart size={15} /> {post.likes?.length || 0}</button>
        <button onClick={() => setExpanded((v) => !v)}><MessageCircle size={15} /> {replies.length} replies {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
        <button onClick={report} title="Report post"><Flag size={14} /></button>
        {isOwner && <button onClick={remove} title="Delete post"><Trash2 size={14} /></button>}
      </div>
      {error && <p className="vx-community-inline-message">{error}</p>}
      {expanded && <CommunityReplies post={post} onChanged={onChanged} />}
      {!hasCommunityToken() && <small className="vx-community-login-hint"><Link to="/login">Log in</Link> to reply or like.</small>}
    </article>
  );
}
