// import "./Sidebar.css";
// import { useContext, useEffect } from "react";
// import { MyContext } from "./MyContext.jsx";
// import { v1 as uuidv1} from "uuid";
// function Sidebar() {
//     const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

//     const getAllThreads = async() => {
//      try {
//        const response = await fetch("http://localhost:8080/api/thread");
//        const res = await response.json();
//        const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));

//        //console.log(filteredData);
//        setAllThreads(filteredData);
       

//      } catch (error) {
//         console.log(err);
//      }
//     };

//      useEffect(() => {
//         getAllThreads();
//     }, [currThreadId])

//     const createNewchat = async() => {
//         setNewChat(true);
//         setPrompt("");
//         setReply(null);
//         setCurrThreadId(uuidv1());
//         setPrevChats([]);

//     }
//     const changeThread = async(newThreadId) => {
//      setCurrThreadId(newThreadId);
//      try {
//      const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
//             const res = await response.json();
//             console.log(res);
//             setPrevChats(res);
//             setNewChat(false);
//             setReply(null);
//      } catch (error) {
//         console.log(err);
//      }
//     }


//     return (
//         <section className="sidebar">
            

//             <button onClick={createNewchat}>
//                 <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
//              <span><i className="fa-solid fa-pen-to-square"></i></span>
//             </button>
            

//             <ul className="history">
//                 {
//                 allThreads?.map((thread,idx) => (
//                 <li key={idx}
//                 onClick={(e) => changeThread(thread.threadId)}
//                 >
//                     {thread.title}
//                 </li>
//                     ))
//                 }
                

//             </ul>
            

//             <div className="sign">
//                 <p>By ApnaColleage &hearts;</p>
//             </div>
//         </section>
//     )
// }
// export default Sidebar; 

// new era

// import "./Sidebar.css";
// import { useContext, useEffect } from "react";
// import { MyContext } from "./MyContext.jsx";
// import {v1 as uuidv1} from "uuid";

// function Sidebar() {
//     const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

//     const getAllThreads = async () => {
//         try {
//             const response = await fetch("https://chatgpt-clone-backend-7laf.onrender.com/api/thread");
//             const res = await response.json();
//             const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
//             //console.log(filteredData);
//             setAllThreads(filteredData);
//         } catch(err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getAllThreads();
//     }, [currThreadId])


//     const createNewChat = () => {
//         setNewChat(true);
//         setPrompt("");
//         setReply(null);
//         setCurrThreadId(uuidv1());
//         setPrevChats([]);
//     }

//     const changeThread = async (newThreadId) => {
//         setCurrThreadId(newThreadId);

//         try {
//             const response = await fetch(`https://chatgpt-clone-backend-7laf.onrender.com/api/thread/${newThreadId}`);
//             const res = await response.json();
//             console.log(res);
//             setPrevChats(res);
//             setNewChat(false);
//             setReply(null);
//         } catch(err) {
//             console.log(err);
//         }
//     }   

//     const deleteThread = async (threadId) => {
//         try {
//             const response = await fetch(`https://chatgpt-clone-backend-7laf.onrender.com/api/thread/${threadId}`, {method: "DELETE"});
//             const res = await response.json();
//             console.log(res);

//             //updated threads re-render
//             setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

//             if(threadId === currThreadId) {
//                 createNewChat();
//             }

//         } catch(err) {
//             console.log(err);
//         }
//     }

//     return (
//         <section className="sidebar">
//             <button onClick={createNewChat}>
//                 <img src="/blacklogo.png" alt="gpt logo" className="logo"></img>
//                 <span><i className="fa-solid fa-pen-to-square"></i></span>
//             </button>


//             <ul className="history">
//                 {
//                     allThreads?.map((thread, idx) => (
//                         <li key={idx} 
//                             onClick={(e) => changeThread(thread.threadId)}
//                             className={thread.threadId === currThreadId ? "highlighted": " "}
//                         >
//                             {thread.title}
//                             <i className="fa-solid fa-trash"
//                                 onClick={(e) => {
//                                     e.stopPropagation(); //stop event bubbling
//                                     deleteThread(thread.threadId);
//                                 }}
//                             ></i>
//                         </li>
//                     ))
//                 }
//             </ul>
 
//             <div className="sign">
//                 <p>By Rishabh Tiwari &hearts;</p>
//             </div>
//         </section>
//     )
// }

// export default Sidebar;


// NEW SIDEBAR.JS 



import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const { 
        allThreads, setAllThreads, 
        currThreadId, setCurrThreadId, 
        setNewChat, setPrompt, 
        setReply, setPrevChats 
    } = useContext(MyContext);

    // 1. Saari history fetch karne ka function
    const getAllThreads = async () => {
        try {
            // URL ko ChatWindow ke URL se match rakhein (Localhost 8080)
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            
            // Backend se aane wale threads ko global state mein save karein
            setAllThreads(res);
        } catch (err) {
            console.log("Error fetching threads:", err);
        }
    };

    // 2. Page load hote hi ek baar history mangwao
    useEffect(() => {
        getAllThreads();
    }, []); // Dependency empty rakhi hai taaki baar-baar fetch na ho

    // 3. Naya Chat button function
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    };

    // 4. Sidebar item par click karke purani chat load karna
    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            
            setPrevChats(res); // Purani messages screen par dikhayega
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log("Error loading thread:", err);
        }
    };

    // 5. Delete function
    const deleteThread = async (threadId) => {
        try {
            await fetch(`http://localhost:8080/api/thread/${threadId}`, { method: "DELETE" });
            
            // State update karo taaki UI se turant hat jaye
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if (threadId === currThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log("Error deleting thread:", err);
        }
    };

    return (
        <section className="sidebar">
            <button className="newChatBtn" onClick={createNewChat}>
                <img src="/blacklogo.png" alt="gpt logo" className="logo" />
                {/* <span> New Chat  <i className="fa-solid fa-pen-to-square"></i></span> */}

                <span> New Chat </span>
<i className="fa-solid fa-pen-to-square" style={{ marginLeft: '10px', fontSize: '14px' }}></i>
            </button>

            <ul className="history">
                {allThreads && allThreads.length > 0 ? (
                    allThreads.map((thread) => (
                        <li 
                            key={thread.threadId} 
                            onClick={() => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted" : ""}
                        >
                            <i className="fa-regular fa-message"></i>
                            <span className="threadTitle">{thread.title}</span>
                            <i 
                                className="fa-solid fa-trash deleteIcon"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                ) : (
                    <p className="noHistory">No history yet</p>
                )}
            </ul>

            <div className="sign">
                <p>By Rishabh Tiwari &hearts;</p>
            </div>
        </section>
    );
}

export default Sidebar;