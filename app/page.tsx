import MainLayout from "@/components/main-layout";
import { Sidebar } from "@/components/sidebar";
import Tweet from "@/components/tweets";
import { Button } from "@/components/ui/button";
import { getTweets } from "@/lib/actions/tweets";
import { getSession, signOut } from "@/lib/auth/auth-actions";

export default async function Home() {
  const session = await getSession()
  const tweetsResult = await getTweets()
  const tweets = tweetsResult.success ? tweetsResult.tweets || [] : []
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
              {tweets.length > 0 ? (tweets.map((tweet, key)=>(<Tweet key={key} tweet={tweet} currentUserId={session?.user.id}/>))) : 
              (<div className="p-8 text-center text-muted-foreground"><p>No tweets yet. Be the first to tweet!</p></div>)}
            </div>
        </MainLayout>
    );
}
