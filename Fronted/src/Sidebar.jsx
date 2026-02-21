

// export default Sidebar;







import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MyContext } from "./MyContext.jsx";

const Sidebar = () => {
    const { allThreads, setAllThreads, setCurrThreadId, setPrevChats, setNewChat } = useContext(MyContext);
    const [hoverId, setHoverId] = useState(null); // Red hover track karne ke liye

    const deleteThread = async (e, idToDelete) => {
        e.stopPropagation(); // Chat select hone se roko
        
        if (window.confirm("Are you sure you want to delete this chat?")) {
            try {
                const token = localStorage.getItem("token");
                // Backend call
                await axios.delete(`https://chatgpt-clone-backend-7laf.onrender.com/api/thread/${idToDelete}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Frontend state update (filter use karke screen se hatao)
                const updatedThreads = allThreads.filter(t => t.threadId !== idToDelete);
                setAllThreads(updatedThreads);
                
                // Agar delete ki hui chat hi khuli thi, toh naya chat open kar do
                setNewChat(true);
                setPrevChats([]);
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Could not delete. Check backend connection.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div style={styles.sidebar}>
            <button style={styles.newChatBtn} onClick={() => {setNewChat(true); setPrevChats([]);}}>
                <span style={{fontSize:'18px'}}>+</span> New chat
            </button>

            <div style={styles.historySection}>
                <p style={styles.historyTitle}>Recent Chats</p>
                {allThreads && allThreads.map((thread) => (
                    <div 
                        key={thread.threadId} 
                        style={styles.historyItem} 
                        onClick={() => setCurrThreadId(thread.threadId)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2b32'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', flex: 1, overflow: 'hidden' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '10px', color: '#8e8ea0'}}>
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span style={styles.textTruncate}>{thread.title || "New Chat"}</span>
                        </div>

                        {/* DELETE BUTTON */}
                        <button 
                            onClick={(e) => deleteThread(e, thread.threadId)} 
                            onMouseEnter={() => setHoverId(thread.threadId)}
                            onMouseLeave={() => setHoverId(null)}
                            style={{
                                ...styles.deleteBtn,
                                color: hoverId === thread.threadId ? '#ff4d4d' : '#8e8ea0'
                            }}
                            title="Delete Chat"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <div style={styles.bottomSection}>
                <div style={styles.userEmail}>{localStorage.getItem("userEmail")}</div>
                <button onClick={handleLogout} style={styles.logoutBtn}>Log out</button>
            </div>
        </div>
    );
};

const styles = {
    sidebar: { width: '260px', backgroundColor: '#202123', height: '100vh', display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', color: '#ececf1' },
    newChatBtn: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: 'transparent', border: '1px solid #4d4d4f', borderRadius: '5px', color: 'white', cursor: 'pointer', marginBottom: '20px' },
    historySection: { flex: 1, overflowY: 'auto' },
    historyTitle: { fontSize: '12px', color: '#8e8ea0', padding: '10px', fontWeight: '600' },
    historyItem: { padding: '10px', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px', transition: '0.2s' },
    textTruncate: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' },
    deleteBtn: { background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' },
    bottomSection: { borderTop: '0.5px solid #4d4d4f', paddingTop: '10px' },
    userEmail: { fontSize: '12px', color: '#8e8ea0', marginBottom: '10px', paddingLeft: '5px' },
    logoutBtn: { width: '100%', padding: '10px', backgroundColor: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }
};

export default Sidebar;