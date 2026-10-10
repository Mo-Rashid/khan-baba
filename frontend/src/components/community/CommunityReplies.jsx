import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { communityApi, hasCommunityToken } from "./communityApi";

function nameOf(user) {
  if (!user) return "Community member";
  return [user.firstName, user.lastName].filter(Boolean).join(" ") || user.name || "Community member";
}

export default function CommunityReplies({ post, onChanged }) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (!hasCommunityToken()) return setError("Please log in to reply.");
    if (body.trim().length < 2) return setError("Reply is too short.");
    setBusy(true); setError("");
    try {
      await communityApi.reply(post._id, body.trim());
      setBody("");
      await onChanged?.();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function solve(replyId) {
    setBusy(true); setError("");
    try { await communityApi.markSolved(post._id, replyId); await onChanged?.(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="vx-community-replies">
      {post.replies?.map((reply) => (
        <div className={`vx-community-reply ${reply.isAccepted ? "is-accepted" : ""}`} key={reply._id}>
          <div className="vx-community-reply-meta"><strong>{nameOf(reply.author)}</strong><small>{new Date(reply.createdAt).toLocaleString()}</small>{reply.isAccepted && <span><CheckCircle2 size={13} /> Accepted solution</span>}</div>
          <p>{reply.body}</p>
          {post.currentUserIsOwner && !post.isSolved && <button className="vx-community-solve-btn" disabled={busy} onClick={() => solve(reply._id)}>Mark as solution</button>}
        </div>
      ))}
      {hasCommunityToken() ? (
        <form className="vx-community-reply-form" onSubmit={submit}>
          <textarea rows={2} maxLength={3000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Share a helpful answer..." required />
          <button className="vx-community-primary" disabled={busy}><Send size={14} /> Reply</button>
        </form>
      ) : <p className="vx-community-login-hint"><Link to="/login">Log in</Link> to share a reply.</p>}
      {error && <p className="vx-community-form-error">{error}</p>}
    </div>
  );
}