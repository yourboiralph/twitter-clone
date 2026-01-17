import MainLayout from "@/components/main-layout";
import ProfileContent from "@/components/profile/profile-content";
import ProfileHeader from "@/components/profile/profile-header";
import { getUserProfile } from "@/lib/actions/profile";
import { getSession } from "@/lib/auth/auth-actions";
import { redirect } from "next/navigation";


export default async function ProfilePage({params} : {params: Promise<{username: string}>}) {
    const session = await getSession()
    if (!session) {
        redirect('/sign-in')
    }

    const resolvedParams = await params
    const username = decodeURIComponent(resolvedParams.username)

    const [profileResult] = await Promise.all([
        getUserProfile(username)
    ])

    if(!profileResult.success) {
        return (
            <MainLayout>
                <div className="p-8 text-center">
                    <h1 className="text-2xk font-bold text-red-500">User Not Found.</h1>
                    <p className="text-muted-foreground mt-2">The user you&apos;re looking for does not exists.</p>
                </div>
            </MainLayout>
        )
    }


    const user = profileResult.user
    return (
        <MainLayout>
            <ProfileHeader user={user} currentUser={session?.user}/>
            <ProfileContent />
        </MainLayout>
    )
}