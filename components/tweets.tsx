"use client";

import { format } from "path";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatTimeAgo } from "@/lib/format-tweet-date";
import { Button } from "./ui/button";
import { CldImage } from "next-cloudinary";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { getInitials } from "@/lib/get-initials";
import Link from "next/link";
import TweetComposer from "./tweet/tweet-composer";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createReplyTweet } from "@/lib/actions/tweets";
import toast from "react-hot-toast";

interface TweetProps {
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
        };
    };

    currentUserId?: string;
}

export default function Tweet({ tweet, currentUserId }: TweetProps) {
    const [showReplyComposer, setShowReplyComposer] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()

    async function handleReply() {
        if (pathname === "/"){
            router.push(`/tweet/${tweet.id}`)
        }else {
            setShowReplyComposer((prev) => !prev)
        }
    }

    async function handleCreateReply(content: string, imageUrl?: string) {

            try {
                const result = await createReplyTweet(tweet.id, content, imageUrl)

                if (result.success) {
                    router.refresh()
                    setShowReplyComposer(false)
                }
            } catch (error) {
                toast.error("Error replying to tweet.")
            }
    }

    return (
        <>
            <Link
                href={`/tweet/${tweet.id}`}
                className="p-4 hover:bg-muted/50 cursor-pointer border-b border-border"
            >
                <div className="flex space-x-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={tweet.author.avatar ?? undefined} />
                        <AvatarFallback>
                            {getInitials(tweet.author.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">
                                {tweet.author.name}
                            </span>
                            <span className="text-muted-foreground">
                                @{tweet.author.username}
                            </span>
                            <span className="text-muted-foreground">.</span>
                            <span className="text-muted-foreground">
                                {formatTimeAgo(tweet.createdAt)}
                            </span>
                        </div>
                        <p className="text-foreground whitespace-pre-wrap">
                            {tweet.content}
                        </p>

                        {/* Images */}
                        {tweet.imageUrl && (
                            <div className="mt-3">
                                <CldImage
                                    src={tweet.imageUrl}
                                    alt="Tweet image"
                                    width={800}
                                    height={600}
                                    className="max-w-full max-h-96 rounded-lg object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        )}

                        <div className="flex items-center space-x-6 text-muted-foreground">
                            <Button
                                variant={"ghost"}
                                onClick={handleReply}
                                className="flex items-center space-x-2 hover:text-primary"
                            >
                                <MessageCircle className="h-4 w-4 " />
                            </Button>

                            <Button
                                variant={"ghost"}
                                className="flex items-center space-x-2 hover:text-green-500"
                            >
                                <Repeat2 className="h-4 w-4 " /> <span>2</span>
                            </Button>

                            <Button
                                variant={"ghost"}
                                className="flex items-center space-x-2 hover:text-red-500"
                            >
                                <Heart className="h-4 w-4 " /> <span>1</span>
                            </Button>

                            <Button
                                variant={"ghost"}
                                className="flex items-center space-x-2 hover:text-green-500"
                            >
                                <Share className="h-4 w-4 " />
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>


            {/* Reply Composer */}

            {showReplyComposer && (
                <div className="p-4 border-b border-border">
                    <TweetComposer placeholder="Tweet your reply..." onSubmit={handleCreateReply} onCancel={() => setShowReplyComposer(false)} />
                </div>
            )}
        </>
    );
}
