import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Initialize MongoDB Client
const client = new MongoClient(process.env.MONGODB_URI!);
// Connect to the database
const db = client.db();

// Configure and export the authentication module
export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true
    }
});

export const getSession = async () => {
    const response = await auth.api.getSession({
        headers: await headers()
    });

    return response;
}

export const signOut = async () => {
    const response = await auth.api.signOut({
        headers: await headers()
    });

    if (response.success) {
        redirect("/sign-in");
    }
}