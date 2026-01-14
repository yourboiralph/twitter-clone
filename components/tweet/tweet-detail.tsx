"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Tweet from "../tweets";
import TweetComposer from "./tweet-composer";

interface TweetDetailProps {
    tweet: {
        id: string;
        content: string;
        imageUrl?: string | null;
        createdAt: Date;
        author: {
            id: string;
            name: string;
            username?: string | null;
            avatar?: string | null;
            image?: string | null;
        }
    },
    replies: null,
    currentUserId: string
}

export default function TweetDetail({
    tweet,
    replies,
    currentUserId,
}: TweetDetailProps) {

    const router = useRouter()
    return <div className="max-w-2xl mx-auto">
        <div className="flex items-center p-4 border-b border-border">
            <Button variant={"ghost"} size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="h-4 w-4"/>
                <h1 className="text-xl font-bold">Tweet</h1>
            </Button>
        </div>


        {/* Parent Tweet if this is a reply */}


        {/* Main Tweet */}
        <Tweet tweet={tweet} />


    </div>;
}
