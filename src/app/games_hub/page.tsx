"use client"
import GameMenu from "../../components/GameMenu";
import Logo from "../../components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import { usePathname, useRouter } from "next/navigation";
import GameButton from "@/components/GameButton";

export type sessionData = {
    CreatedAt: string,
    ExpiresAt: string,
    ID: string,
    UserEmail: string
}

export default function GamesHub() {
    const router = useRouter();
    const pathname = usePathname();
    useCheckSession();
    return <>
        <Logo />
        <GameMenu current = "games"/>
        <div style={{position: 'fixed', display: 'flex', justifyContent:'center', top: "20%", left: 0, right: 0}}>
            <GameButton marginLeft={0} game="/snake" imgUrl='/img/snake_game.png' unlocked={true}/>
            <GameButton marginLeft={10} game="/slot" imgUrl='/img/slot_machine_game.avif' unlocked={true}/>
            <GameButton marginLeft={10} game="/flappy_bird" imgUrl='/img/flappy_bird_game.png' unlocked={true}/>
            <GameButton marginLeft={10} game="/" imgUrl='/img/slot_machine_game.avif' unlocked={false}/>
        </div>
        <div style={{position: 'fixed', display: 'flex', justifyContent:'center', top: "50%", left: 0, right: 0}}>
            <GameButton marginLeft={0} game="/online_gateway?game=tic_tac_toe" imgUrl='/img/tic_tac_toe.jpg' unlocked={true}/>
            <GameButton marginLeft={10} game="/" imgUrl='/img/slot_machine_game.avif' unlocked={false}/>
        </div>
    </>
}