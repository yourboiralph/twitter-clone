"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInWithGoogle, signUpWithEmail } from "@/lib/auth/auth-actions";
import { authClient } from "@/lib/auth/auth-client";
import { Chrome } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            await signUpWithEmail(
                formData.email,
                formData.password,
                formData.name,
                formData.username
            );
        } catch (error) {
            setError("An error occured. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError("");
        try {
            const result = await authClient.signIn.social({
                provider: "google"
            });

            if (!result.error) {
                router.push("/")
            }
        } catch (error) {
            setError("An error occured. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xl">
                            𝕏
                        </span>
                    </div>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>Join 𝕏 Today!</CardDescription>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="text-red-600 p-3 text-sm bg-red-50 rounded mb-4">
                            {error}
                        </div>
                    )}
                    <div className="space-y-3 mb-6">
                        <Button
                            className="w-full h-12 bg-white border border-gray-300 text-black hover:bg-gray-50"
                            onClick={handleGoogleSignIn}
                        >
                            <Chrome className="w-5 h-5 mr-2" /> Sign up with
                            Google
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                OR
                            </span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSignUp}>
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Full Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name."
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium"
                            >
                                Username
                            </label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Choose a username."
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Provide a valid email address."
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Above 6 character password."
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium"
                            >
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password."
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary text-primary-foreground hover:bg-gray-800"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Creating an account"
                                : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href={"/sign-in"}
                                className="text-primary hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
