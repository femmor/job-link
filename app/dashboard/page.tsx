import { KanbanBoard } from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import { Board } from "@/lib/models/board";

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

    return (<>
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-700">{board?.name}</h1>
                    <p className="text-gray-600">Track and manage your job application progress effectively.</p>
                    <KanbanBoard board={board} userId={userId} />
                </div>
            </div>
        </div>
    </>);
}