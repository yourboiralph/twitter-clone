import TweetDetail from "@/components/tweet/tweet-detail"
import { getTweetById } from "@/lib/actions/tweets"
import { getSession } from "@/lib/auth/auth-actions"
import { redirect } from "next/navigation"


export default async function TweetPage({params}: {params: Promise<{id: string}>}) {


    const session = await getSession()
    if(!session?.user){
        redirect("/sign-in")
    }
    const paramsResolved = await params
    const id = paramsResolved.id

    const tweetResult = await getTweetById(id)

    if (!tweetResult.success || !tweetResult.tweet) {
        redirect("/")
    }
    return (
        <TweetDetail tweet={tweetResult.tweet} replies={null} currentUserId={session?.user.id}/>
    )
}