    // const [messages, setMessages] = useState<Message[]>([]);
    // const [input, setInput] = useState("");
    // const [username] = useState(getUserEmail()?.split("@")[0]);
    // const ws = useRef<WebSocket | null>(null);
    // const hasRun = useRef(false);

    // useEffect(() => {
    //     if (hasRun.current) return;
    //     hasRun.current = true;
    //     // Connect to WebSocket server
    //     ws.current = new WebSocket("ws://localhost:8081/ws");

    //     // Handle incoming messages
    //     ws.current.onmessage = (event) => {
    //     const message = JSON.parse(event.data);
    //     setMessages((prevMessages) => [...prevMessages, message]);
    //     };

    // }, []);
    
    // const sendMessage = () => {
    //     if (input.trim() && ws.current) {
    //     const message = { username, text: input };
    //     ws.current.send(JSON.stringify(message));
    //     setInput("");
    //     }
    // };

"use client"
import React, { useState, useRef, useEffect } from "react";
import {
  styled,
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  Stack,
  Container,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import ChatContainer from "@/components/chat/ChatContainer";
import MessagesContainer from "@/components/chat/MessagesContainer";
import MessageBubble from "@/components/chat/MessageBubble";
import MessageContent from "@/components/chat/MessageContent";
import InputContainer from "@/components/chat/InputContainer";
import useCheckSession from "@/utils/useCheckSession";

const dummyMessages = [
  {
    id: 1,
    text: "Hey! How are you doing?",
    isUser: false,
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    text: "I'm doing great! Thanks for asking. How about you?",
    isUser: true,
    timestamp: "10:02 AM",
  },
  {
    id: 3,
    text: "I'm good too! Just working on some new projects.",
    isUser: false,
    timestamp: "10:05 AM",
  },
];

const ChatUI = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useCheckSession();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          isUser: true,
          timestamp: currentTime,
        },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return <>
    <GameMenu current="chat"/>
    <Logo />
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <ChatContainer>
        <MessagesContainer>
          {messages.map((message) => (
            <div key={message.id}>
            <Typography  style={{ 
                fontSize: 12,
                marginLeft: message.isUser ? 0 : "16px", 
                marginRight: message.isUser ? "16px" : 0,
                display: "flex",
                flexDirection: message.isUser ? "row-reverse" : "row",
                }}>Username</Typography>
            <MessageBubble isUser={message.isUser}>
              <MessageContent isUser={message.isUser}>
                <Typography variant="body1" component="div">
                  {message.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.7, mt: 0.5, display: "block" }}
                >
                  {message.timestamp}
                </Typography>
              </MessageContent>
            </MessageBubble>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <InputContainer>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "#fff" }}
              aria-label="Message input field"
            />
            <IconButton
              onClick={handleSendMessage}
              color="primary"
              aria-label="Send message"
              sx={{
                backgroundColor: "#2196f3",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </InputContainer>
      </ChatContainer>
    </Container>
    </>
};

export default ChatUI;