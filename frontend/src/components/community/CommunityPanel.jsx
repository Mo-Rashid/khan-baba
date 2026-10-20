
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  MessageCircle,
  X,
  Send,
  Users,
  Minimize2,
} from "lucide-react";

import {
  chatApi,
  isChatLoggedIn,
} from "./chatApi";

import "./community.css";

export default function CommunityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);

  const loadMessages = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const result = await chatApi.list();

      setMessages(
        Array.isArray(result.messages)
          ? result.messages
          : []
      );

      setError("");
    } catch (err) {
      setError(
        err.message || "Unable to load community messages."
      );
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages(true);

    const timer = window.setInterval(
      () => loadMessages(false),
      5000
    );

    return () => window.clearInterval(timer);
  }, [loadMessages]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  async function handleSend(event) {
    event.preventDefault();

    const message = text.trim();

    if (!message || sending) return;

    if (!isChatLoggedIn()) {
      setError("Please Profile in before sending a message.");
      return;
    }

    setSending(true);
    
    setError("");

    try {
      const result = await chatApi.send(message);

      if (result.message) {
        setMessages((current) => [
          ...current,
          result.message,
        ]);
      }

      setText("");
      await loadMessages(false);
    } catch (err) {
      setError(
        err.message || "Message could not be sent."
      );
    } finally {
      setSending(false);
    }
  }

  function formatTime(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="vx-chat-widget">
      {isOpen && (
        <section
          className="vx-chat-window"
          aria-label="VulnXploit Community chat"
        >
          <header className="vx-chat-header">
            <div className="vx-chat-avatar">
              <Users size={22} />
            </div>

            <div className="vx-chat-heading">
              <strong>VulnXploit Community</strong>
              <span>Share experiences with everyone</span>
            </div>

            <button
              type="button"
              className="vx-chat-icon-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
              title="Minimize"
            >
              <Minimize2 size={18} />
            </button>

            <button
              type="button"
              className="vx-chat-icon-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              title="Close"
            >
              <X size={19} />
            </button>
          </header>

          <div className="vx-chat-status">
            <MessageCircle size={15} />
            Community group chat
          </div>

          <div className="vx-chat-messages">
            {loading ? (
              <div className="vx-chat-placeholder">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="vx-chat-placeholder">
                <MessageCircle size={34} />
                <strong>No messages yet</strong>
                <span>Start the conversation!</span>
              </div>
            ) : (
              messages.map((item) => (
                <article
                  className="vx-chat-message"
                  key={
                    item._id ||
                    `${item.senderId}-${item.createdAt}`
                  }
                >
                  <div className="vx-chat-message-name">
                    {item.senderName || "Community User"}
                  </div>

                  <div className="vx-chat-message-text">
                    {item.message}
                  </div>

                  <time className="vx-chat-time">
                    {formatTime(item.createdAt)}
                  </time>
                </article>
              ))
            )}

            <div ref={bottomRef} />
          </div>

          {error && (
            <div className="vx-chat-error" role="alert">
              {error}
            </div>
          )}

          <form
            className="vx-chat-composer"
            onSubmit={handleSend}
          >
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={
                isChatLoggedIn()
                  ? "Type a message..."
                  : "Sign in to send a message"
              }
              maxLength={2000}
              aria-label="Your message"
              disabled={sending}
            />

            <button
              type="submit"
              disabled={!text.trim() || sending}
              aria-label="Send message"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </form>

          <footer className="vx-chat-footer">
            Be respectful. Never share passwords or secret keys.
          </footer>
        </section>
      )}

      <button
        type="button"
        className={`vx-chat-launcher ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={
          isOpen ? "Close community chat" : "Open community chat"
        }
        title="VulnXploit Community"
      >
        {isOpen ? (
          <X size={25} />
        ) : (
          <MessageCircle size={27} />
        )}

        {!isOpen && (
          <span className="vx-chat-launcher-dot" />
        )}
      </button>
    </div>
  );
}
