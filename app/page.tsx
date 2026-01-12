import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-actions";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <Button onClick={signOut}>Logout</Button>
    </div>
  );
}
