import { sessionData } from "@/app/games_hub/page";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export default function useCheckSession(dependency?: any) {
    const router = useRouter();
    const hasRun = useRef(false);

    useEffect(() => {
        if (dependency == null) {
            if (hasRun.current) return;
            hasRun.current = true;
        }

        try {
            const sessionData = localStorage.getItem("sessionData");
            if (!sessionData) {
                alert("Не съществува сесия, моля първо се логнете (или регистрирайте)");
                router.push("/login");
            } else {
                const parsedSessionData: sessionData = JSON.parse(sessionData!);
                if (Date.parse(parsedSessionData.ExpiresAt) <= Date.now()) {
                    alert("Сесията Ви е изтекла, за да продължите, моля логнете се отново");
                    localStorage.removeItem("sessionData");
                    router.push("/login");
                }
            }
        } catch (e) {
            console.error("Failed to validate session:", e);
            alert("Възникна проблем със сесията, моля опитайте отново");
            router.push("/login");
        }

    }, [router, dependency])
}