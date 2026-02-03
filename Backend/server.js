import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true
}));
app.use(cookieParser());
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async ()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected with Database")
    } catch (error) {
      console.log(" failed to connect with DB",error)
    }
}

// UserName = shivamrathore2805_db_user
  // Password = dQkEvPpTOiXx9jis

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "gpt-4.1-mini",
//       messages: [{
//         role: "user",
//         content: req.body.message
//       }]
//     })
//   }


//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data = await response.json();
//     console.log(data.choices[0].message.content);
//     res.send(data.choices[0].message.content);
//   } catch (err) {
//     console.log(err);
//   }

// });

