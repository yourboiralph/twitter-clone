import { CldImage } from "next-cloudinary"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getInitials } from "@/lib/get-initials"
import { Button } from "../ui/button"
import { Calendar, Edit } from "lucide-react"

interface ProfileHeaderProps {
    user: {
        id: string,
        name: string,
        username: string,
        bio?: string | null,
        avatar?: string | null,
        image?: string | null,
        createdAt: Date,
        _count: {
            tweets: number,
            // followers: number,
            // following: number,
        }
    },
    currentUser: {
        id: string,
        name: string,
        username: string
    }
}

export default function ProfileHeader({user, currentUser} : ProfileHeaderProps) {

    function formatJoinDate (date: Date) {
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric"
        }).format(date)
    }
    const isOwnProfile = currentUser.id === user.id
    return (
        <div className="border-b border-border">
            <div className="h-48 bg-linear-to-r from-blue-400 to-purple-500 relative">
            {user.image ? (
                <CldImage src={user.image} alt="Banner" width={800} height={192} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            ) : (
                <div className="w-full h-full bg-linear-to-r from-blue-400 to-purple-500" />
            )}
            </div>


            {/* PROFILE INFO SECTION */}
            <div className="px-4 pb-4">
                <div className="flex justify-between items-start -mt-16 mb-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar ?? undefined} />
                        <AvatarFallback>
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>

                    {isOwnProfile ? (
                        <Button variant="outline" className="mt-4 z-2"><Edit className="h-4 w-4 mr-2" />Edit Profile</Button>
                    ) : (
                        <Button variant="outline" className="mt-4 z-2">Follow</Button>
                    )}
                </div>

                {/* User Details */}
                <div className="space-y-3">
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <h1 className="text-muted-foreground">@{user.username}</h1>
                    </div>

                    {user.bio && <p className="text-foreground">{user.bio}</p>}


                    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 mr-2"/>
                            <span>Joined {formatJoinDate(user.createdAt)}</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                            <span className="font-semibold text-foreground">4</span>
                            <span className="text-muted-foreground">Following</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-semibold text-foreground">4</span>
                            <span className="text-muted-foreground">Followers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-semibold text-foreground">{user._count.tweets}</span>
                            <span className="text-muted-foreground">Tweets</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}