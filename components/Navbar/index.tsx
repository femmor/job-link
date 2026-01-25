import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <nav className="bg-background border-b border-gray-200 py-4 mb-8">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                    <Briefcase size={32} className="text-primary" />
                    <span className="text-accent-foreground">Job<span className="text-primary emphasis font-medium italic">link</span></span>
                </Link>
                <div>
                    <Link href="/sign-in" className="ml-auto text-sm font-bold no-underline">
                        <Button variant="ghost" className="cursor-pointer">Sign In</Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button className="ml-4 cursor-pointer" size="sm">
                            Start for Free
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
