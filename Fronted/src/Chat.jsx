// import "./Chat.css";
// import { useContext, useState,useEffect} from "react";
// import { MyContext } from "./MyContext";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// function Chat() {
//     const {newChat,prevChats, reply}= useContext(MyContext);
//       const [latestReply, setLatestReply] = useState(null);
//        useEffect(() => {
//         if(reply === null) {
//             setLatestReply(null); //prevchat load
//             return;
//         }

//         if(!prevChats?.length) return;

//         const content = reply.split(" "); //individual words

//         let idx = 0;
//         const interval = setInterval(() => {
//             setLatestReply(content.slice(0, idx+1).join(" "));

//             idx++;
//             if(idx >= content.length) clearInterval(interval);
//         }, 40);

//         return () => clearInterval(interval);

//     }, [prevChats, reply])

      
//     return (
//         <>
//         {newChat &&<h1>Start a New Chat!</h1>}
//         <div className="chats">
//             {
//                 prevChats?.slice(0, -1).map((chat,idx)=>
//                 <div className={chat.role === "user"? "userDiv": "gptDiv"} key={idx}>
//                   {
//                     chat.role === "user" ?
//                      <p className="userMessage">{chat.content}</p>:
//                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
//                   }
//                 </div>
                
//                 )

//             }

//             {
//                 prevChats.length > 0 && latestReply !== null &&
//                 <div className="gptDiv" key={ "typing"}>
//                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>   

//                 </div> 
//             }

//             {
//                 prevChats.length > 0 && latestReply === null &&
//                 <div className="gptDiv" key={ "typing"}>
//                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>   

//                 </div> 
//             }

            
//         </div>
//         </>
//     )
// }
// export default Chat;

// new era begain
// import "./Chat.css";
// import React, { useContext, useState, useEffect } from "react";
// import { MyContext } from "./MyContext";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";

// function Chat() {
//     const {newChat, prevChats, reply} = useContext(MyContext);
//     const [latestReply, setLatestReply] = useState(null);

//     useEffect(() => {
//         if(reply === null) {
//             setLatestReply(null); //prevchat load
//             return;
//         }

//         if(!prevChats?.length) return;

//         const content = reply.split(" "); //individual words

//         let idx = 0;
//         const interval = setInterval(() => {
//             setLatestReply(content.slice(0, idx+1).join(" "));

//             idx++;
//             if(idx >= content.length) clearInterval(interval);
//         }, 40);

//         return () => clearInterval(interval);

//     }, [prevChats, reply])

//     return (
//         <>
//             {newChat && 
//             <>
//                 <h1>Start a New Chat!</h1>
//             <p className="dummyText">Introducing the ultimate AI-powered assistant designed to make your life easier. Whether you're looking for instant answers to complex questions, need help with coding, or just want to brainstorm creative ideas, this app provides real-time, intelligent responses at your fingertips.</p>
//             </>
//             }
//             <div className="chats">
//                 {
//                     prevChats?.slice(0, -1).map((chat, idx) => 
//                         <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
//                             {
//                                 chat.role === "user"? 
//                                 <p className="userMessage">{chat.content}</p> : 
//                                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
//                             }
//                         </div>
//                     )
//                 }

//                 {
//                     prevChats.length > 0  && (
//                         <>
//                             {
//                                 latestReply === null ? (
//                                     <div className="gptDiv" key={"non-typing"} >
//                                     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
//                                 </div>
//                                 ) : (
//                                     <div className="gptDiv" key={"typing"} >
//                                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
//                                 </div>
//                                 )

//                             }
//                         </>
//                     )
//                 }

//             </div>
//         </>
//     )
// }

// export default Chat;



import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if (!reply) {
            setLatestReply(null);
            return;
        }

        const content = reply.split(" ");
        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= content.length) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
    }, [reply]);

    return (
        <div className="chatContainerMain">
            {newChat && (
                <div className="welcomeScreen">
                    <h1>Start a New Chat!</h1>
                   <p className="dummyText">Introducing the ultimate AI-powered assistant designed to make your life easier. Whether you're looking for instant answers to complex questions, need help with coding, or just want to brainstorm creative ideas, this app provides real-time, intelligent responses at your fingertips.</p>
                </div>
            )}

            <div className="chats">
                {prevChats?.map((chat, idx) => {
                    // Typing effect sirf sabse aakhri message aur AI ke reply par lagao
                    const isLast = idx === prevChats.length - 1;
                    const isAI = chat.role === "assistant";
                    const contentToShow = (isLast && isAI && latestReply) ? latestReply : chat.content;

                    return (
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            <div className="avatar">
                                {chat.role === "user" ? "👤" : "🤖"}
                            </div>
                            <div className="messageContent">
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {contentToShow}
                                </ReactMarkdown>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chat;