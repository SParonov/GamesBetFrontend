import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      style={{ position: "absolute", color: "white", top: 20, left: 20 }}
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      color="secondary"
      onClick={() => router.push("/games_hub")}
    >
      Back
    </Button>
  );
}
