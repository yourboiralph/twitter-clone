"use client";

import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { Camera, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/get-initials";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { username } from "better-auth/plugins";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        id: string;
        name: string;
        username?: string | null;
        bio?: string | null;
        avatar?: string | null;
        image?: string | null;
    };
}

export default function EditProfileModal({
    isOpen,
    onClose,
    user,
}: EditProfileModalProps) {
    const [banner, setBanner] = useState<string | null>(user.image || null);
    const [avatar, setAvatar] = useState<string | null>(user.avatar || null);
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        bio: user.bio || ""
    })
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const bannerInputRef = useRef<HTMLInputElement>(null)
    const avatarInputRef = useRef<HTMLInputElement>(null)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>

                    <form className="space-y-6">
                        <div className="relative">
                            <div className="h-32 bg-linear-to-r from-blue-400 to-purple-500 overflow-hidden rounded-lg relative">
                                {banner && (
                                    <Image
                                        src={banner}
                                        alt="Banner"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    id="image-upload"
                                    onChange={() => {}}
                                    ref={bannerInputRef}
                                />
                                <Button
                                    onClick={() =>
                                        bannerInputRef.current?.click()
                                    }
                                    variant={"ghost"}
                                    type="button"
                                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                        </div>

                        <div className="flex items-center space-x-4 -mt-16 ml-4">
                            <div className="relative">
                                <Avatar className="h-24 w-24 border-4 border-background">
                                    <AvatarImage src={user.avatar ?? undefined} />
                                    <AvatarFallback className="text-xl">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>


                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    id="image-upload"
                                    onChange={() => {}}
                                    ref={avatarInputRef}
                                />
                                <Button
                                    onClick={() =>
                                        avatarInputRef.current?.click()
                                    }
                                    variant={"ghost"}
                                    type="button"
                                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>


                        <div className="space-y-4 pt-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                <Input type="text"
                                id="name" name="name"
                                onChange={handleInputChange}
                                value={formData.name} placeholder="Enter your name" maxLength={50} required />
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                                <Input type="text" id="username" name="username"
                                onChange={handleInputChange}
                                value={formData.username ?? ""}  placeholder="Enter your username" maxLength={30} required />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio</label>
                                <Textarea id="bio" name="bio" 
                                onChange={handleInputChange}
                                value={formData.bio} 
                                className="resize-none"
                                placeholder="Tell us about yourself" maxLength={160}
                                rows={3} required />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <Button type="button" variant={"outline"} onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
