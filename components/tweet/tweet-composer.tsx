"use client"

import { SessionUser } from "@/lib/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/get-initials";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface TweetComposerProps {
    user?: SessionUser;
    placeholder?: string;
    onSubmit?: () => void;
    onCancel?: () => void;
}

export default function TweetComposer({
    user,
    placeholder = "What's Happening",
    onSubmit,
    onCancel,
}: TweetComposerProps) {

    const [content, setContent] = useState("")
    return (
        <div className="border-b border-border p-4">
            <form className="space-y-3">
                <div className="flex space-x-3">
                    {user && <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar ?? ""} />
                        <AvatarFallback>
                            {getInitials(user.name ?? "")}
                        </AvatarFallback>
                    </Avatar>}

                    <div className="flex-1 space-y-3">
                        <Textarea placeholder={placeholder} className="min-h-25 border-0 resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0 max-w-5xl" maxLength={280} onChange={(e) => setContent(e.target.value)}/>

                        <div className="flex justify-between items-center">
                            <div className="flex space-x-4">
                                <input type="file" className="hidden" accept="image/*" id="image-upload"/>
                                <Button variant={"ghost"} type="button" className="text-blue-500 hover:text-blue-600 p-2">
                                    <ImageIcon className="w-5 h-5"/>
                                </Button>
                            </div>

                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-muted-foreground">{content.length}/280</span>
                                {/* REPLY FUNCTIONALITY */}


                                <Button type="submit" className="rounded-full px-6" disabled={!content.trim() || content.length > 280}>Tweet</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
