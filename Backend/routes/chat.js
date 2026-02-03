import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "shivam",
            title: "Sample Testing",
        });

        const response = await thread.save();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to save in Db" });
    }
});

// Get ALL Thread

router.get("/thread", authenticateToken, async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });

        // decending order of updatedAt...most recent data on top
        res.json(threads);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to Fetch threads" });
    }
});

router.get("/thread/:threadId", authenticateToken, async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });

        if (!thread) {
            res.status(404).json({ error: "Thread not Found" });
        }

        res.json(thread.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to Fetch chat" });
    }
});

router.delete("/thread/:threadId", authenticateToken, async (req, res) => {
    const { threadId } = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });

        if (!deletedThread) {
            res.status(404).json({ error: " Thread could not be deleted" });
        }

        res.status(200).json({ success: "Thead deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to delete thread" });
    }
});

router.post("/chat", authenticateToken, async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        res.status(404).json({ error: "missing required fields" });
    }

    try {
        let thread = await Thread.findOne({threadId});

        if (!thread) {
            // Create New Thread in Db
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message })
        }

        const  assistantReply = await getOpenAIAPIResponse(message)
        thread.messages.push({ role: "assistant", content: assistantReply })
        thread.updatedAt = new Date()
        await thread.save();
        res.json({ reply: assistantReply })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong!" })
    }
})

export default router;
