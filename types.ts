import { ReactNode } from "react";
import { IColumn } from "./lib/models/column";
import { IBoard } from "./lib/models/board";

export interface ColumnConfig {
    color: string;
    icon: ReactNode;
}

export interface DroppableColumnProps {
    column: IColumn;
    config: ColumnConfig;
    boardId: string;
}

export interface KanbanBoardProps {
    board: IBoard;
    columns: IColumn[];
    userId?: string;
}