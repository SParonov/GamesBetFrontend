import { sessionData } from "@/app/games_hub/page";

const getUserEmail = () => {
    const sessionData = localStorage.getItem("sessionData");
    if(!sessionData) return;
    const parsedSessionData: sessionData = JSON.parse(sessionData!);
    const userEmail= parsedSessionData["UserEmail"];

    return userEmail;
  }

export default getUserEmail;