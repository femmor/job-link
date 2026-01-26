"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { FormEvent } from "react";

export default function SignIn() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError(null);
        setIsLoading(true);

        try {
            const response = await signIn.email({
                email: userData.email,
                password: userData.password
            });

            if (response.error) {
                setError(response.error.message ?? "Failed to sign in. Please try again.");
            } else {
                // Sign-in successful, redirect to dashboard
                router.push("/dashboard");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-black text-center">
                        Sign In
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-center">
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-center">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                placeholder="Enter your email"
                                required
                                className="border-gray-300 focus:border-default focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                placeholder="Enter your password"
                                minLength={8}
                                className="border-gray-300 focus:border-default focus:ring-primary"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="font-medium text-primary hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
