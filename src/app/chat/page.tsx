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
  TextField,
  IconButton,
  Typography,
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
import getUserEmail from "@/utils/getUserEmail";
import api from "@/utils/axios";


type Message = {
  id: number;
  text: string;
  email: string | undefined;
  timestamp: string;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [currEmail, setCurrEmail] = useState<string | undefined>("");
  const ws = useRef<WebSocket | null>(null);

  useCheckSession();

  useEffect(() => {
    const email = getUserEmail();
    setCurrEmail(email);

    ws.current = new WebSocket("ws://localhost:8081/ws");
    ws.current.onopen = async () => {
      try {
        const res = await api.get("/getChatHistory");
        setMessages(res.data.ChatHistory);
      } catch(err: any) {
        console.log(err);
      }
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);     
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    const socket = ws.current;

    return () => {
        socket.close();
    };
  }, []);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const messObj = {
        id: messages.length + 1,
        text: newMessage,
        email: currEmail,
        timestamp: currentTime,
      };

      ws.current?.send(JSON.stringify(messObj));
      setNewMessage("");

      try {
        await api.post("/saveMessToChatHistory", messObj)
      } catch(err: any) {
        console.log(err);
      }
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
                marginLeft: (message.email == currEmail) ? 0 : "16px", 
                marginRight: (message.email == currEmail) ? "16px" : 0,
                display: "flex",
                flexDirection: (message.email == currEmail) ? "row-reverse" : "row",
                }}>{message.email?.split("@")[0]}</Typography>
            <MessageBubble isUser={message.email == currEmail}>
              <MessageContent isUser={message.email == currEmail}>
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