import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function GameButton({marginLeft, game, imgUrl, unlocked}: {marginLeft: number, game: string, imgUrl: string, unlocked: boolean}) {
    const router = useRouter();
    const pathname = usePathname();
    return <Button
    sx={{
        width: 175,
        height: 175,
        marginLeft: marginLeft,
        backgroundColor: 'green',
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'green',
        },
        '&:disabled': {
        backgroundColor: 'white',
        backgroundImage: 'url(/img/not_unlocked_yet.png)',
        },
    }}
    onClick={() => router.push(pathname + game)}
    disabled={!unlocked}
    disableRipple
/>
}