import { DroppableColumnProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, Trash2 } from "lucide-react";

export function DroppableColumn({ column, config, boardId }: DroppableColumnProps) {
    return (<Card className="w-64 shrink-0 h-full pt-0" key={boardId}>
        <CardHeader className={`flex items-center space-x-2 p-4 ${config.color}`}>
            <div>
                <div className="flex justify-center items-center space-x-2">
                    {config.icon}
                    <CardTitle className="text-white font-semibold mt-2">{column.name}</CardTitle>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={`ml-auto p-0 w-8 h-8 rounded-full hover:bg-white/20 focus:ring-0`} >
                        <MoreVertical className={`h-6 w-6 text-white border-0`} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                    <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>

        <CardContent className="pt-4 space-y-4 bg-gray-50/50 min-h-100 rounded-b-lg">

        </CardContent>
    </Card>)
}