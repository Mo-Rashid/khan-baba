import { useState } from "react";
import { Send, X } from "lucide-react";
import { communityApi } from "./communityApi";

const categories = ["Web Security", "Bug Bounty", "AI Security", "Mobile Security", "DevOps", "General"];

export default function CreatePost({ onCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (title.trim().length < 8) return setError("Title must be at least 8 characters.");
    if (description.trim().length < 15) return setError("Please describe the problem in at least 15 characters.");
    setBusy(true);
    try {
      const result = await communityApi.create({ title: title.trim(), description: description.trim(), category });
      onCreated?.(result.post);
    } catch (err) {
      setError(err.message || "Could not publish your problem. Please sign in again if needed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="vx-community-create" onSubmit={submit}>
      <div className="vx-community-form-title"><strong>Share a problem</strong><button type="button" onClick={onCancel} aria-label="Close form"><X size={17} /></button></div>
      <input maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short, clear problem title" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      <textarea maxLength={5000} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What happened? What did you try? Include safe error messages, not passwords or API keys." required />
      {error && <p className="vx-community-form-error">{error}</p>}
      <button className="vx-community-primary" type="submit" disabled={busy}><Send size={15} /> {busy ? "Publishing..." : "Publish problem"}</button>
    </form>
  );
}