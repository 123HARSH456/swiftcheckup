import "./App.css";
import ReactMarkdown from "react-markdown";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import userIcon from "./assets/user-icon.png";
import logos from "./assets/logos.svg";
import sendBtn from "./assets/send.svg";
import user from "./assets/user.svg";
import medic from "./assets/medic.svg";
import logo2 from "./assets/swiftlogo2.png";
import { useEffect, useRef, useState } from "react";
import { sendMsgToChatBot } from "./functionality";

function App() {
  const msgEnd = useRef(null);
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello, how can I help you!",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input;
    setInput("");

    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
      { text: "Thinking...", isBot: true },
    ]);

    setLoading(true);

    try {
      const res = await sendMsgToChatBot(text);

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { text: res, isBot: true } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleQuery = async (e) => {
    if (loading) return;

    const text = e.target.value;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
      { text: "Thinking...", isBot: true },
    ]);

    setLoading(true);

    try {
      const res = await sendMsgToChatBot(text);

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { text: res, isBot: true } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={logo2} alt="Logo" className="logo" />
            <span className="brand">SwiftCheckupAI</span>
          </div>
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>

          <div className="upperSideBottom">
            <button
              className="query"
              onClick={handleQuery}
              value="What is Hypertrophy"
              disabled={loading}
            >
              <img src={msgIcon} alt="query" />
              What is Hypertrophy
            </button>
            <button
              className="query"
              onClick={handleQuery}
              value="What is Schizophrenia"
              disabled={loading}
            >
              <img src={msgIcon} alt="query" />
              What is Schizophrenia
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <button
              className="homeBtn"
              onClick={() => {
                window.location.reload();
              }}
            >
              <img src={home} alt="Home Tab" className="addBtn" />
              Home
            </button>
          </div>
          <div className="listItems">
            <button
              className="teamBtn"
              onClick={() => {
                window.location.href = "https://teamintro.vercel.app/";
              }}
            >
              <img src={saved} alt="Team info" className="addBtn" />
              Team Info
            </button>
          </div>
          <div className="listItems">
            <button
              className="donateBtn"
              onClick={() => {
                window.location.href = "https://buymeacoffee.com/dynamicblink";
              }}
            >
              <img src={rocket} alt="Donate Us Here" className="addBtn" />
              Donate Us
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatimg"
                src={message.isBot ? logo2 : user}
                alt=""
              />
              <p className="txt">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message..."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              ref={inputRef}
            />
            <button className="send" onClick={handleSend} disabled={loading}>
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p>
            "Responses are AI-generated and may not always be accurate. Please
            consult a medical professional for serious concerns."
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
