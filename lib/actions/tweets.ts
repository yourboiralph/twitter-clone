"use server"

import { redirect } from "next/navigation"
import { getSession } from "../auth/auth-actions"
import prisma from "../prismaclient"

export async function createTweet(content: string) {
    const session = await getSession()

    if(!session?.user){
        redirect("/sign-in")
    }
    try {
        const tweet = await prisma.tweet.create({
            data:{
                content,
                imageUrl: null,
                authorId: session.user.id
            }
        })

        return {success: true, tweet}
    } catch (error) {
        console.error("Error creating tweet:", error)
        return {success: false, error: "Failed to create tweet"}
    }
}

export async function getTweets() {
    try {
        const tweets = await prisma.tweet.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {success: true, tweets}
    } catch (error) {
        console.error("Error fetching tweets:", error)
        return {success: false, error: "Failed to fetch tweets"}
    }
}