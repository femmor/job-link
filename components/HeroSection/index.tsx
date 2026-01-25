import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
    return (
        <section className="container mx-auto p-4 py-32">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-foreground mb-6 text-6xl font-bold">A better way to track your job applications</h1>
                <p className="text-muted-foreground mb-10 text-xl">Capture, organize and manage your job search efficiently.</p>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                        <Link href="/sign-up" className="flex items-center gap-2 text-xl font-semibold no-underline">
                            <Button size="lg" className="cursor-pointer">Start for free <ArrowRight size={24} /></Button>
                        </Link>
                    </div>
                    <p>Free forever, no credit card required.</p>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
