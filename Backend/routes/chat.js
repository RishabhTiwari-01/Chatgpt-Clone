





import express from "express";
import Thread from "../models/Thread.js";
// import getOpenAIAPIResponse from "../utils/gemini.js"; // Isko import rehne do
import getGeminiResponse from "../utils/gemini.js";

const router = express.Router();

// 1. Test Route
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "test-" + Date.now(),
            title: "Testing New Thread"
        });
        const response = await thread.save();
        return res.status(200).json(response);
    } catch (err) {
        console.error("Test Error:", err);
        return res.status(500).json({ error: "Failed to save in DB" });
    }
});

// 2. Main Chat Route
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            thread = new Thread({
                threadId,
                title: message.substring(0, 30),
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        // --- ABHI DUMMY HAI, REAL CHALANA HO TOH NECHE WALA UNCOMMENT KARNA ---
        //  const assistantReply = "Bhai, ye dummy response hai aur database fresh hai!";
        
        // ASLI OPENAI KE LIYE ISKO CHALANA (Lekin pehle dummy test karlo):
         const assistantReply = await getGeminiResponse(message);

        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();

        // await thread.save();
        // return res.json({ reply: assistantReply });

        /// History ke lie


        await thread.save();

// Hum pura thread object bhej rahe hain taaki Frontend ko 
// pata chale ki sidebar mein kya title aur ID dikhani hai.
return res.json({ 
    reply: assistantReply, 
    thread: thread 
});

    } catch (err) {
        console.error("Chat Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3. Baki Routes (Get All, Get Single, Delete) - Inme koi change nahi chahiye
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        return res.json(threads);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch threads" });
    }
});

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) return res.status(404).json({ error: "Thread not found" });
        return res.json(thread.messages);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch chat" });
    }
});

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) return res.status(404).json({ error: "Thread not found" });
        return res.status(200).json({ success: "Thread deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete thread" });
    }
});

export default router;



