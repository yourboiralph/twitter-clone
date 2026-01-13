import MainLayout from "@/components/main-layout";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-actions";

export default function Home() {
    return (
        <MainLayout>
            <div className="border-b border-border">
              <div className="p-4 ">
                <h1 className="text-xl font-bold">Home</h1>
              </div>
            </div>

            {/* Tweet Composer */}


            {/* Tweet Feed */}
            <div className="divide-y divide-border">
              <div className="p-8 text-center text-muted-foreground"><p>No tweets yet. Be the first to tweet!</p></div>
            </div>
        </MainLayout>
    );
}
