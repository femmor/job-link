import { KanbanBoard } from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import { Board } from "@/lib/models/board";
import { Column } from "@/lib/models/column";

export default async function DashboardPage() {
    const session = await getSession();
    if (!session?.user) {
        return (
            <div>
                <h1>Please sign in to access your dashboard.</h1>
            </div>
        );
    }
    const userId = session.user.id;
    const board = await Board.findOne({ userId: userId }).populate("columns").exec();

    if (!board) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-700">No Board Found</h1>
                        <p className="text-gray-600">Please create a board to start tracking your job applications.</p>
                    </div>
                </div>
            </div>
        );
    }

    const columns = await Column.find({ boardId: board._id }).sort({ order: 1 }).exec();
    const parsedBoard = JSON.parse(JSON.stringify(board));
    const parsedColumns = JSON.parse(JSON.stringify(columns));

    return (<>
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-700">{parsedBoard?.name}</h1>
                    <p className="text-gray-600">Track and manage your job application progress effectively.</p>
                    <KanbanBoard board={parsedBoard} columns={parsedColumns} userId={userId} />
                </div>
            </div>
        </div>
    </>);
}