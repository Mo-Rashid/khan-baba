
import { useState } from "react";
import { Send, X } from "lucide-react";
import { communityApi } from "./communityApi";

const categories = [
  "Web Security",
  "Bug Bounty",
  "AI Security",
  "Mobile Security",
  "DevOps",
  "General",
];

export default function CreatePost({ onCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (title.trim().length < 8) {
      setError("Title must contain at least 8 characters.");
      return;
    }

    if (description.trim().length < 15) {
      setError("Description must contain at least 15 characters.");
      return;
    }

    setBusy(true);

    try {
      const result = await communityApi.create({
        title: title.trim(),
        description: description.trim(),
        category,
      });

      setTitle("");
      setDescription("");
      setCategory("General");

      onCreated?.(result.post || null);
    } catch (err) {
      setError(
        err.message || "Could not publish the post. Please sign in again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="vx-community-create" onSubmit={submit}>
      <div className="vx-community-form-title">
        <div>
          <h3>Create a discussion</h3>
          <p>Share a security question, problem, or useful discovery.</p>
        </div>

        <button
          className="vx-community-close"
          type="button"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X size={18} />
        </button>
      </div>

      <label htmlFor="community-title">Post title</label>
      <input
        id="community-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. How can I debug this CORS issue?"
        minLength={8}
        maxLength={120}
        required
      />

      <label htmlFor="community-category">Category</label>
      <select
        id="community-category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label htmlFor="community-description">Description</label>
      <textarea
        id="community-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Explain the issue, what you tried, and the result..."
        minLength={15}
        maxLength={5000}
        rows={5}
        required
      />

      <div className="vx-community-character-count">
        {description.length}/5000 characters
      </div>

      {error && (
        <p className="vx-community-form-error" role="alert">
          {error}
        </p>
      )}

      <div className="vx-community-form-actions">
        <button
          className="vx-community-secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="vx-community-primary"
          type="submit"
          disabled={busy}
        >
          <Send size={16} />
          {busy ? "Publishing..." : "Publish post"}
        </button>
      </div>
    </form>
  );
}
