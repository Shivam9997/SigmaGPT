import "./Sidebar.css"
import { useContext, useEffect } from "react";
import {MyContext} from "./MyContext.jsx"
import {v1 as uuidv1} from "uuid";
import { getAuthHeaders, API_BASE_URL } from "./utils/api.js";


function Sidebar() {
  const {allThreads, setAllThreads, currThreadId, setNewChat,setPrompt,setReply, setCurrThreadId,setPrevChats, logout, user} = useContext(MyContext)

  const getAllThreads = async ()=>{

    try {
      const response = await fetch(`${API_BASE_URL}/api/thread`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch threads');
      }
      
      const res = await response.json();
      const filteredData = res.map(thread=> ({threadId: thread.threadId, title: thread.title}))
      // console.log(filteredData);
      setAllThreads(filteredData);
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getAllThreads();
  }, [currThreadId])

     const createNewChat =()=>{
      setNewChat(true);
      setPrompt("");
      setReply(null);
      setCurrThreadId(uuidv1())
      setPrevChats([])
     }

     const changeThread = async (newThreadId)=>{
      setCurrThreadId(newThreadId);

      try {
        const response = await fetch(`${API_BASE_URL}/api/thread/${newThreadId}`, {
          headers: getAuthHeaders()
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch thread');
        }
        
        const res = await response.json();
        // console.log(res);
        setPrevChats(res);
        setNewChat(false);
        setReply(null);

      } catch (error) {
        console.log(error)
      }

     }

     const deleteThread = async (threadId) =>{
         try {
          const response = await fetch(`${API_BASE_URL}/api/thread/${threadId}`, {
            method: "DELETE",
            headers: getAuthHeaders()
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete thread');
          }
          
          const res = await response.json();
          console.log(res)
          setAllThreads(prev=> prev.filter(thread => thread.threadId !== threadId));

          if(threadId === currThreadId) {
            createNewChat();
          }
          
         } catch (error) {
          console.log( error);

          
         }
     }
     
     const handleLogout = async () => {
       try {
         await fetch(`${API_BASE_URL}/api/auth/logout`, {
           method: 'POST',
           headers: getAuthHeaders()
         });
       } catch (error) {
         console.log('Logout error:', error);
       } finally {
         logout();
       }
     }

    return (
      <section className="sidebar">

      <button onClick={createNewChat}>
           <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
         <span>✏️</span>
      </button>
          
             <ul className="history">
               {
                 allThreads?.map((thread, idx)=> (
                   <li key={idx}
                   onClick={(e) =>changeThread(thread.threadId)}
                  >
                     {thread.title}
                     <span className="delete-icon"
                          onClick={(e) =>{
                            e.stopPropagation();
                            deleteThread(thread.threadId);
                          }}
                     >🗑️</span>
                     </li>
                 ))
               }
             </ul>

        <div className="sign">
            <div className="user-info">
              <span className="username">👤 {user?.username}</span>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                Logout
              </button>
            </div>
            <p>By ApnaShivam ❤️</p>
        </div>
      </section>
    )
}


export default Sidebar;