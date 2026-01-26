import { IBoard } from "@/lib/models/board";

interface KanbanBoardProps {
    board: IBoard;
    userId: string;
}

export function KanbanBoard({ board, userId }: KanbanBoardProps) {
    return (
        <div>
            Kanban Board Component for board: {board?.name} and userId: {userId}
        </div>
    );
}