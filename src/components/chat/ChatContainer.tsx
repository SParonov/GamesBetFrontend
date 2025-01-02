import { Paper, styled } from "@mui/material";

const ChatContainer = styled(Paper)(() => ({
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  }));

export default ChatContainer;