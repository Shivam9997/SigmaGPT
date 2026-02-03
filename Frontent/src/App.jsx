import './App.css'
import Sidebar from "./Sidebar.jsx"
import ChatWindow from './ChatWindow.jsx'
import Login from './Login.jsx'
import { MyContext } from './MyContext.jsx'
import { useState, useEffect } from 'react'
import {v1 as uuidv1} from "uuid";


function App() {
  const [prompt,setPrompt] = useState("");
  const [reply,setReply]= useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1())
  const [prevChats, setPrevChats ] = useState([]);
  const [newChat, setNewChat] =  useState(true)
  const [allThreads, setAllThreads] = useState([])
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    // Reset chat state
    setCurrThreadId(uuidv1());
    setPrevChats([]);
    setAllThreads([]);
    setNewChat(true);
  };

  const providerValues = {
    prompt,setPrompt,
    reply,setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    user, setUser,
    isAuthenticated, setIsAuthenticated,
    logout
  };

  if (loading) {
    return (
      <div className='app' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
   <div className='app'>
    <MyContext.Provider value={providerValues}>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <ChatWindow />
        </>
      ) : (
        <Login />
      )}
    </MyContext.Provider>
   </div>
  )
}

export default App
