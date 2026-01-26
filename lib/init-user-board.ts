import { connectDB } from "./db";
import { Board } from "./models/board";
import { Column } from "./models/column";

const DEFAULT_COLUMNS = [
    {
        name: "Wishlist",
        order: 0
    },
    {
        name: "Applied",
        order: 1
    },
    {
        name: "Interviewing",
        order: 2
    },
    {
        name: "Offer",
        order: 3
    },
    {
        name: "Rejected",
        order: 4
    }
];

export async function initUserBoard(userId: string) {
    try {
        // Connect to the database
        await connectDB();

        // Get the existing board for the user
        const existingBoard = await Board.findOne({ userId, name: "Default Board" });

        // Check if the user board already exists
        if (existingBoard) {
            return existingBoard;
        }

        // Create a new board for the user
        const board = Board.create({
            name: "Default Board",
            userId,
            columns: []
        })

        // Create default columns and associate them with the board
        const columns = await Promise.all(DEFAULT_COLUMNS.map(async (col) =>
            await Column.create({
                name: col.name,
                order: col.order,
                boardId: (await board)._id,
                jobApplications: []
            })
        ));

        // Update the board with the created columns
        (await board).columns = columns.map(col => col._id);
        await (await board).save();

        return board;

    } catch (error) {
        throw new Error(`Failed to initialize user board for userId ${userId}: ${error}`);
    }
}