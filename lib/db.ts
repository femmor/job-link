/**
 * MongoDB Connection Utility with Connection Caching
 * 
 * This module provides a cached MongoDB connection for Next.js applications.
 * Connection caching is crucial in serverless environments to prevent
 * exhausting database connection limits due to frequent reconnections.
 */
import mongoose from "mongoose";

// Get MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Ensure MongoDB URI is provided - fail fast if missing
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

/**
 * Interface for caching mongoose connection and promise
 * - conn: stores the active mongoose connection
 * - promise: stores the connection promise to prevent multiple simultaneous connections
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

/**
 * Extend global object to include mongoose cache
 * This allows the cache to persist across module reloads in development
 */
declare global {
    var mongooseCache: MongooseCache;
}

// Initialize cache from global or create new empty cache
const mongooseCache: MongooseCache = global.mongooseCache || { conn: null, promise: null };

// In development, preserve cache across hot reloads by storing it globally
if (process.env.NODE_ENV !== "production") {
    global.mongooseCache = mongooseCache;
}

/**
 * Establishes and returns a cached MongoDB connection
 * 
 * This function implements a connection caching strategy to:
 * 1. Reuse existing connections when available
 * 2. Prevent multiple simultaneous connection attempts
 * 3. Handle connection failures gracefully
 * 
 * @returns Promise that resolves to mongoose instance
 * @throws Error if connection fails
 */
export async function connectDB() {
    // Return existing connection if available
    if (mongooseCache.conn) {
        return Promise.resolve(mongooseCache.conn);
    }

    // If no connection exists but a connection attempt is in progress, wait for it
    if (!mongooseCache.promise) {
        // Start new connection attempt and cache the promise
        mongooseCache.promise = mongoose.connect(MONGODB_URI!).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    try {
        // Wait for connection to complete and cache the result
        mongooseCache.conn = await mongooseCache.promise;
    } catch (error) {
        // Clear the promise on failure so next attempt can try again
        mongooseCache.promise = null;
        throw error;
    }

    return mongooseCache.conn;
}

/**
 * Ensures database connection is established
 * This is called automatically when models are imported
 */
const ensureConnection = () => {
    if (!mongooseCache.conn && !mongooseCache.promise) {
        connectDB().catch(console.error);
    }
};

// Auto-initialize connection when this module is imported
ensureConnection();

