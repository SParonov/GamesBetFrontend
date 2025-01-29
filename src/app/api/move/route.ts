import { pusherServer } from "@/utils/pusher/pusher";

export async function POST(req: Request) {
    try {
        const { ID, move } = await req.json();

        await pusherServer.trigger(ID, "move-made", move);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error triggering Pusher:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to trigger move" }), { status: 500 });
    }
}