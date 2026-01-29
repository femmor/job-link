"use client";

import { Award, Calendar, CheckCircle2, Mic, XCircle } from "lucide-react";
import { ColumnConfig, KanbanBoardProps } from "@/types";
import { DroppableColumn } from "./DroppableColumn";

const COLUMN_CONFIG: Array<ColumnConfig> = [
    {
        color: "bg-blue-500",
        icon: <Calendar className="h-6 w-6 text-white" />
    },
    {
        color: "bg-green-500",
        icon: <CheckCircle2 className="h-6 w-6 text-white" />
    },
    {
        color: "bg-purple-500",
        icon: <Mic className="h-6 w-6 text-white" />
    },
    {
        color: "bg-yellow-500",
        icon: <Award className="h-6 w-6 text-white" />
    },
    {
        color: "bg-red-500",
        icon: <XCircle className="h-6 w-6 text-white" />
    }
];

export function KanbanBoard({ board, columns, userId }: KanbanBoardProps) {

    return (
        <>
            <div className="overflow-x-auto container mx-auto py-4">
                <div className="flex gap-4">
                    {columns.map((col, key) => {
                        const config = COLUMN_CONFIG[key] || {
                            color: "bg-blue-500",
                            icon: <Calendar className="h-5 w-5 text-white" />
                        }

                        return (
                            <DroppableColumn key={key} column={col} config={config} boardId={board._id.toString()} />
                        )
                    })}
                </div>
            </div>
        </>
    );
}