




import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MyContext } from "./MyContext.jsx";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { v1 as uuidv1 } from "uuid";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Har refresh par token check karo
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      setToken(null);
    }
    setLoading(false);
  }, []);

  // Context Values
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); 
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  if (loading) return null; // Jab tak check ho raha ho, kuch mat dikhao

  const providerValues = {
    prompt, setPrompt, reply, setReply,
    currThreadId, setCurrThreadId, newChat, setNewChat,
    prevChats, setPrevChats, allThreads, setAllThreads
  }; 

  return (
    <BrowserRouter>
      <Routes>
        {/* Agar login nahi hai, toh sirf Login page */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />

        {/* Protected Chat Page */}
        <Route 
          path="/" 
          element={
            token ? (
              <div className='app'>
                <MyContext.Provider value={providerValues}>
                  <Sidebar />
                  <ChatWindow />
                </MyContext.Provider>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Galat URL handle karne ke liye */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;