
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Hero Images section with tabs */}
        <section className="border-t bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              {/* Tabs - Buttons to switch different images */}
              <div className="mb-8 flex justify-center gap-2">
                <Button variant="ghost" className="cursor-pointer">Organize Applications</Button>
                <Button variant="ghost" className="cursor-pointer">Get Hired</Button>
                <Button variant="ghost" className="cursor-pointer">Manage Boards</Button>
              </div>
              {/* Images corresponding to each tab */}
              <div className="mx-auto max-w-5xl relative overflow-hidden rounded-lg shadow-xl border border-gray-200">
                <Image src="/hero-images/hero1.png" alt="Organize Applications" width={1200} height={800} />
                <Image src="/hero-images/hero2.png" alt="Get Hired" width={1200} height={800} />
                <Image src="/hero-images/hero3.png" alt="Manage Boards" width={1200} height={800} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}