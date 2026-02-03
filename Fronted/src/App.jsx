// import './App.css';
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
// import { MyContext } from './MyContext.jsx';
// import {useState} from "react";
// import { v1 as uuidv1} from "uuid";



// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [ currThreadId, setCurrThreadId] = useState(uuidv1());
//   const [prevChats, setPrevChats] = useState([]);// store all chats from curr threads
//   const [newChat, setNewChat] = useState(true);
//    const [allThreads, setAllThreads] = useState([]);
//   const providerValue = {
//     prompt, setPrompt,
//     reply, setReply,
//     currThreadId, setCurrThreadId,
//     newChat, setNewChat,
//     prevChats, setPrevChats,
//     allThreads, setAllThreads


//   };
//   return (
//     <div className='app'>
//       <MyContext.Provider value = {providerValue}>
//      <Sidebar></Sidebar>
//      <ChatWindow></ChatWindow>
//      </MyContext.Provider>
    
//    </div> 
//   )  
// }
// export default App;

// new era begain

// import './App.css';
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
// import {MyContext} from "./MyContext.jsx";
// import { useState } from 'react';
// import {v1 as uuidv1} from "uuid";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(uuidv1());
//   const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);

//   const providerValues = {
//     prompt, setPrompt,
//     reply, setReply,
//     currThreadId, setCurrThreadId,
//     newChat, setNewChat,
//     prevChats, setPrevChats,
//     allThreads, setAllThreads
//   }; 

//   return (
//     <div className='app'>
//       <MyContext.Provider value={providerValues}>
//           <Sidebar></Sidebar>
//           <ChatWindow></ChatWindow>
//         </MyContext.Provider>
//     </div>
//   )
// }

// export default App

//NEW APP.JSS


import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState, useEffect } from 'react';
import { v1 as uuidv1 } from "uuid";
import axios from "axios"; // Axios import karna mat bhulna

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); 
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]); // Isme saari history rahegi

  // --- YE NAYA PART HAI: History Load Karne Ke Liye ---
  useEffect(() => {
    const fetchAllHistory = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/thread");
        setAllThreads(res.data); // Backend se threads list yahan save hogi
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchAllHistory();
  }, []);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
          <Sidebar />
          <ChatWindow />
        </MyContext.Provider>
    </div>
  )
}

export default App;