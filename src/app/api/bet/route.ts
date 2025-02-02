import { pusherServer } from "@/utils/pusher/pusher";

const gameBets: Record<string, { [user: string]: number }> = {};

export async function POST(req: Request) {
  try {
    const { ID, user, amount } = await req.json();

    if (!gameBets[ID]) {
      gameBets[ID] = {};
    }

    gameBets[ID][user] = amount;

    // Check if both players have placed their bets
    const users = Object.keys(gameBets[ID]);
    if (users.length === 2) {
      const bets = Object.values(gameBets[ID]);
      const minBet = Math.min(...bets);

      // Notify both players that the game is starting with the min bet
      await pusherServer.trigger(ID, "bet-finalized", { minBet });

      // Reset bets for future games
      delete gameBets[ID];
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error handling bet:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
