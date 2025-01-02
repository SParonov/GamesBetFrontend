import { Paper, styled } from "@mui/material";

const MessageContent = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ isUser }) => ({
    padding: "12px 16px",
    borderRadius: "16px",
    maxWidth: "70%",
    marginLeft: isUser ? 0 : "12px",
    marginRight: isUser ? "12px" : 0,
    backgroundColor: isUser ? "#2196f3" : "#f5f5f5",
    color: isUser ? "#fff" : "#000",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
    transform: "scale(1.02)",
    },
}));

export default MessageContent;