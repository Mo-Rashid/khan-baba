
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { communityApi, hasCommunityToken } from "./communityApi";

export default function CommunityPost({ post, onChanged }) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const postId = post._id || post.id;
  const replies = Array.isArray(post.replies) ? post.replies : [];
  const author =
    post.author?.username ||
    post.author?.name ||
    post.username ||
    post.name ||
    "Community member";

  const rawLikes = post.likes;
  const likes = Array.isArray(rawLikes)
    ? rawLikes.length
    : Number(post.likesCount ?? post.likeCount ?? rawLikes ?? 0);

  const date = post.createdAt || post.created_at;
  const dateText = date
    ? new Date(date).toLocaleDateString()
    : "";

  async function handleLike() {
    setError("");

    if (!hasCommunityToken()) {
      setError("Please sign in to like a post.");
      return;
    }

    setBusy(true);

    try {
      await communityApi.toggleLike(postId);
      await onChanged?.();
    } catch (err) {
      setError(err.message || "Could not like this post.");
    } finally {
      setBusy(false);
    }
  }

  async function handleReply(event) {
    event.preventDefault();
    setError("");

    if (!hasCommunityToken()) {
      setError("Please sign in to reply.");
      return;
    }

    if (replyText.trim().length < 2) {
      setError("Please enter a reply.");
      return;
    }

    setBusy(true);

    try {
      await communityApi.reply(postId, replyText.trim());
      setReplyText("");
      setShowReply(false);
      await onChanged?.();
    } catch (err) {
      setError(err.message || "Could not submit your reply.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="vx-community-post">
      <div className="vx-community-post-top">
        <div className="vx-community-avatar">
          {author.charAt(0).toUpperCase()}
        </div>

        <div className="vx-community-author">
          <strong>{author}</strong>
          <span>
            {dateText && <Clock size={13} />}
            {dateText || "Community discussion"}
          </span>
        </div>

        {post.solved && (
          <span className="vx-community-solved">
            <CheckCircle2 size={14} />
            Solved
          </span>
        )}
      </div>

      <div className="vx-community-post-content">
        <span className="vx-community-category">
          {post.category || "General"}
        </span>

        <h3>{post.title || "Untitled discussion"}</h3>

        <p>{post.description || post.body || ""}</p>
      </div>

      {error && (
        <p className="vx-community-form-error" role="alert">
          {error}
        </p>
      )}

      <div className="vx-community-post-actions">
        <button type="button" onClick={handleLike} disabled={busy}>
          <Heart size={17} />
          <span>{likes} Likes</span>
        </button>

        <button
          type="button"
          onClick={() => setShowReply((value) => !value)}
        >
          <MessageCircle size={17} />
          <span>{replies.length} Replies</span>
        </button>
      </div>

      {replies.length > 0 && (
        <div className="vx-community-replies">
          {replies.map((reply, index) => {
            const replyAuthor =
              reply.author?.username ||
              reply.author?.name ||
              reply.username ||
              "Member";

            return (
              <div
                className="vx-community-reply"
                key={reply._id || reply.id || index}
              >
                <strong>{replyAuthor}</strong>
                <p>{reply.body || reply.text || reply.content || ""}</p>
              </div>
            );
          })}
        </div>
      )}

      {showReply && (
        <form className="vx-community-reply-form" onSubmit={handleReply}>
          <input
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            placeholder="Write a helpful reply..."
            maxLength={2000}
            required
          />

          <button type="submit" disabled={busy}>
            <Send size={15} />
            {busy ? "Sending..." : "Reply"}
          </button>
        </form>
      )}
    </article>
  );
}
