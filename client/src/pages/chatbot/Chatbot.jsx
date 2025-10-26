import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! I'm your health assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // 👇 Replace this with your Gemini API call later
    setTimeout(() => {
      const reply = {
        from: "bot",
        text: "I'm analyzing your question... Remember, always consult a real doctor for serious issues!",
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: 6,
        boxShadow: 4,
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#f8fafc",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #2196f3, #21cbf3)",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="white" fontWeight={600}>
          🩺 Health Chatbot
        </Typography>
        <Typography variant="caption" color="white">
          Ask anything about your health and wellness
        </Typography>
      </Box>

      {/* Chat Messages */}
      <Paper
        sx={{
          height: 400,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          backgroundColor: "#f0f4f8",
        }}
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  maxWidth: "80%",
                  bgcolor:
                    msg.from === "user" ? "#1976d2" : "white",
                  color: msg.from === "user" ? "white" : "black",
                  boxShadow: msg.from === "bot" ? 1 : "none",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            </Box>
          </motion.div>
        ))}

        {loading && (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Typing...
            </Typography>
          </Box>
        )}

        <div ref={chatEndRef} />
      </Paper>

      {/* Input Area */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          p: 1.5,
          backgroundColor: "white",
        }}
      >
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Type your health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
}
