import { Box, styled } from "@mui/material";

const MessageBubble = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isUser',
  })<{ isUser: boolean }>(({ isUser }) => ({
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px",
    flexDirection: isUser ? "row-reverse" : "row",
}));

export default MessageBubble;