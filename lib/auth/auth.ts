import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

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