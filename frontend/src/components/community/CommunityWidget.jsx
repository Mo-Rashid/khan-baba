import { useEffect, useState } from "react";
import { MessageCircle, X, ShieldCheck } from "lucide-react";
import CommunityPanel from "./CommunityPanel";
import "./community.css";

export default function CommunityWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="vx-community-root">
      {open && (
        <section className="vx-community-window" aria-label="VulnXploit Community">
          <header className="vx-community-header">
            <div className="vx-community-brand">
              <span className="vx-community-brand-icon"><ShieldCheck size={21} /></span>
              <span><strong>VulnXploit Community</strong><small>Ask • Share • Solve together</small></span>
            </div>
            <button className="vx-community-icon-btn" onClick={() => setOpen(false)} aria-label="Close community"><X size={20} /></button>
          </header>
          <CommunityPanel />
        </section>
      )}
      <button
        className={`vx-community-launcher ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close community" : "Open community"}
        title="VulnXploit Community"
      >
        {open ? <X size={25} /> : <><MessageCircle size={24} /><span className="vx-community-launcher-label">Community</span></>}
      </button>
    </div>
  );
}
