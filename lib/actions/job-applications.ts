"use server"

import { getSession } from "../auth/auth";
import { connectDB } from "../db";
import { Board } from "../models/board";
import { Column } from "../models/column";
import { JobApplication } from "../models/job-applications";

interface JobApplicationData {
    company: string;
    position: string;
    location?: string;
    salary?: string;
    jobUrl?: string;
    tags?: string[];
    description?: string;
    notes?: string;
    boardId: string;
    columnId: string;
}

export const createJobApplication = async (data: JobApplicationData) => {
    // Check if user is authenticated
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    // Connect to the database
    await connectDB();

    // Extract data from the data object
    const { company, position, location, salary, jobUrl, tags, description, notes, boardId, columnId } = data;

    // Validate required fields
    if (!company || !position || !boardId || !columnId) {
        throw new Error("Missing required fields");
    }

    // Verify if the logged-in user has access to the specified board
    const board = await Board.findOne({ _id: boardId, userId: session.user.id });
    if (!board) {
        throw new Error("Board not found or access denied");
    }

    // Verify if the specified column exists in the board
    const column = await Column.findOne({ _id: columnId, boardId: boardId });
    if (!column) {
        throw new Error("Column not found in the specified board");
    }

    // Get the maximum order value for the existing job applications in the column
    const maxOrder = await JobApplication.findOne({ columnId }).sort({ order: -1 }).select("order").lean() as { order: number } | null;

    // Create a new job application object
    const jobApplication = await JobApplication.create({
        userId: session.user.id,
        company,
        position,
        location,
        salary,
        jobUrl,
        tags: tags || [],
        description,
        notes,
        boardId,
        columnId,
        status: "applied",
        order: (maxOrder?.order || 0) + 1
    });

    // Save the job application to the database
    await Column.findByIdAndUpdate(columnId, { $push: { jobApplications: jobApplication._id } });

    return {
        success: true,
        data: JSON.parse(JSON.stringify(jobApplication))
    }
}