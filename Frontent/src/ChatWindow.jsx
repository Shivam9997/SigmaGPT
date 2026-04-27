import "./ChatWindow.css";
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { getAuthHeaders, API_BASE_URL } from "./utils/api.js";

function ChatWindow({ onMenuClick }) {
   const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext);
   const [loading, setLoading] = useState(false)

   const getReply = async () => {
    if (!prompt.trim()) return;

    setLoading(true)
    setNewChat(false)

    const option = {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            message: prompt,
            threadId: currThreadId
        })
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, option);
        
        if (!response.ok) {
          throw new Error('Failed to get reply');
        }
        
        const res = await response.json();
        setReply(res.reply);
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
   }

   // Append new chat to prevChats
   useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prev => [
        ...(Array.isArray(prev) ? prev : []),
        { role: "user", content: prompt },
        { role: "assistant", content: reply }
      ]);
    }

    setPrompt("");
  }, [reply]);


    return (
        <div className="chatWindow">
            <div className="navbar">
                <div className="nav-left">
                    <button className="hamburger" onClick={onMenuClick} aria-label="Open sidebar">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <span className="brand">SigmaGPT</span>
                </div>
                <div className="userIconDiv">
                    <span className="userIcon">👤</span>
                </div>
            </div>

            <div className="chat-area">
                <Chat />
                {loading && (
                    <div className="loader-wrapper">
                        <ScaleLoader color="#ececec" loading={loading} height={18} />
                    </div>
                )}
            </div>

            <div className="chatInput">
                <div className="inputBox">
                    <input 
                        placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : null}
                    />
                    <div id="submit" onClick={getReply}>➤</div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;
