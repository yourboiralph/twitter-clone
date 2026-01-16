"use server"

import { redirect } from "next/navigation"
import { getSession } from "../auth/auth-actions"
import prisma from "../prismaclient"

export async function createTweet(content: string, imageUrl?: string) {
    const session = await getSession()

    if(!session?.user){
        redirect("/sign-in")
    }
    try {
        const tweet = await prisma.tweet.create({
            data:{
                content,
                imageUrl,
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
                },
                likes: true
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


export async function getTweetById(tweetId: string) {
    try {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id: tweetId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                },
                likes: true
            }
        })

        if(!tweet) {
            return {success: false, error: "Tweet Not Found."} 
        }

        return {success: true, tweet}
    } catch (error) {
        console.error("Error getting tweet:", error)
        return {success: false, error: "Failed to get tweet"}
    }
}

export async function getTweetReplies(tweetId: string) {
    try {
        const replies = await prisma.tweet.findMany({
            where: {
                parentId: tweetId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                },
                likes: true
            }
        })

        return {success: true, replies}
    } catch (error) {
        console.error("Error getting tweet replies:", error)
        return {success: false, error: "Failed to get tweet replies"}
    }
}



export async function createReplyTweet(tweetId:string, content: string, imageUrl?: string) {
    const session = await getSession()

    if(!session?.user){
        redirect("/sign-in")
    }
    try {
        const tweet = await prisma.tweet.create({
            data:{
                content,
                imageUrl,
                authorId: session.user.id,
                parentId: tweetId
            }
        })

        return {success: true, tweet}
    } catch (error) {
        console.error("Error creating tweet:", error)
        return {success: false, error: "Failed to create tweet"}
    }
}



export async function likeTweet(tweetId: string) {
    const session = await getSession()

    if (!session?.user){
        redirect('/sign-in')
    }

    try {
        // check to see if user already liked
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_tweetId: {
                    userId: session.user.id,
                    tweetId
                }
            }
        })

        if(existingLike){
            //unlike since it exists
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
            return {success: true, action: "unliked"}
        }else{
            await prisma.like.create({
                data: {
                    userId: session.user.id,
                    tweetId
                }
            })
            return {success: true, action: "liked"}
        }

    } catch (error) {
        console.error("Error liking tweet:", error)
        return {success: false, error: "Failed to like tweet"}
    }
}
