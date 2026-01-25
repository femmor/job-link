"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUp() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(userData)

        // clear form after submission
        setUserData({
            name: "",
            email: "",
            password: ""
        });
    }

    return (
        <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-black text-center">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-center">
                        Create a new account to get started
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700">
                                Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                placeholder="Enter your name"
                                required
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
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
                        >
                            Create Account
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/sign-in"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
