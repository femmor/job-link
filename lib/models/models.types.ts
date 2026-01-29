export interface JobApplication {
    _id: string;
    company: string;
    position: string;
    location?: string;
    status: string;
    columnId: string;
    boardId: string;
    userId: string;
    order: number;
    notes?: string;
    salary?: number;
    jobUrl?: string;
    appliedDate?: Date;
    tags?: string[];
    description?: string;
}

export interface Column {
    _id: string;
    name: string;
    order: number;
    jobApplications: JobApplication[];
}

export interface Board {
    _id: string;
    name: string;
    columns: Column[];
}