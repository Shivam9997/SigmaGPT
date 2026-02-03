import "./ChatWindow.css";
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect} from "react";
import { ScaleLoader} from  "react-spinners";
import { getAuthHeaders, API_BASE_URL } from "./utils/api.js";

function ChatWindow() {
   const {prompt , setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
   const [loading, setLoading] = useState(false)

   const getReply = async ()=>{
    if (!prompt.trim()) return;

    setLoading(true)
    setNewChat(false)

    console.log("message", prompt,"threadId", currThreadId)
    const option = {
        method:"POST",
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
        console.log(res)
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
                <span>SigmaGPT</span>
                <div className="uerIconDiv">
                <span className="userIcon">👤</span>
                </div>
            </div>
            <Chat></Chat>
                     
                <ScaleLoader color="#fff" loading={loading} >
                
                </ScaleLoader> 
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                    value={prompt}
                    onChange={(e)=> setPrompt(e.target.value)}
                    onKeyDown={(e)=> e.key === 'Enter'? getReply() : ''}
                    >
                            
                    </input>
                    <div id="submit" onClick={getReply}>➤</div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info. see Cookie Preference
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;