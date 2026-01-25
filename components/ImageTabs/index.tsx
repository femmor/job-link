"use client"

import { useState } from "react";
import { Button } from "../ui/button"
import clsx from "clsx";
import Image from "next/image";

const ImageTabs = () => {
    const [activeTab, setActiveTab] = useState("Organize Applications");

    const handleActiveTabChange = (tab: string) => {
        setActiveTab(tab);
    }

    const renderImage = () => {
        switch (activeTab) {
            case "Organize Applications":
                return <Image src="/hero-images/hero1.png" alt="Organize Applications" width={1200} height={600} className="w-full h-auto object-cover transition-all duration-500 ease-in-out" />;
            case "Get Hired":
                return <Image src="/hero-images/hero2.png" alt="Get Hired" width={1200} height={600} className="w-full h-auto object-cover transition-all duration-500 ease-in-out" />;
            case "Manage Boards":
                return <Image src="/hero-images/hero3.png" alt="Manage Boards" width={1200} height={600} className="w-full h-auto object-cover transition-all duration-500 ease-in-out" />;
            default:
                return <Image src="/hero-images/hero1.png" alt="Organize Applications" width={1200} height={600} className="w-full h-auto object-cover transition-all duration-500 ease-in-out" />;
        }
    }

    return (
        <>
            {/* Tabs - Buttons to switch different images */}
            <div className="mb-8 flex justify-center gap-2">
                <Button variant="ghost" className={clsx(activeTab === "Organize Applications" && "bg-primary text-white", "transition")} onClick={() => handleActiveTabChange("Organize Applications")}>Organize Applications</Button>
                <Button variant="ghost" className={clsx(activeTab === "Get Hired" && "bg-primary text-white", "transition")} onClick={() => handleActiveTabChange("Get Hired")}>Get Hired</Button>
                <Button variant="ghost" className={clsx(activeTab === "Manage Boards" && "bg-primary text-white", "transition")} onClick={() => handleActiveTabChange("Manage Boards")}>Manage Boards</Button>
            </div>
            {/* Images corresponding to each tab */}
            <div className="mx-auto max-w-5xl relative overflow-hidden rounded-lg shadow-xl border border-gray-200">
                {renderImage()}
            </div>
        </>
    )
}

export default ImageTabs
