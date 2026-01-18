'use client'

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"



/*
COULEURS -> Slate ou blue
*/


export function CurrentPath() {
    
    const pathname = usePathname().split("/")
    const styles = {
        color: "blue",
        textDecoration: "underline"
    }

    return (
        <div>{pathname.map((segment, index) => (<a style={styles} href={pathname.slice(0, index+1).join("/")} key={index}>{segment}/</a>))}</div>
    )
}

function Route () {

    const [currentLoc, setCurrentLoc] = useState('dashboard')
    const pathname = usePathname()

    const navigation = (loc) => ({
        backgroundColor: pathname.endsWith(loc) && "rgb(223, 229, 237",
        padding: "10px",
        paddingLeft: "30px",
        borderRadius: "10px"
    })

    return (
        <div className="flex flex-col text-xl gap-1">
            <Link style={navigation("/")} onClick={() => setCurrentLoc("dashboard")} href="/">Dashboard</Link>
            <Link style={navigation("technologies")} onClick={() => setCurrentLoc("technologies")} href="/routes/technologies">Technologies</Link>
            <Link style={navigation("project")} onClick={() => setCurrentLoc("project")} href="/routes/project">All Projects</Link>
            <Link style={navigation("execute")} onClick={() => setCurrentLoc("execute")} href="/routes/execute">Execute</Link>
        </div>
    )
}

function LeftPanel () {
    return (
        <div className="p-6 bg-slate-50">
            <Route />
        </div>
    )
}

function TopPanel () {
    return (
        <div className="flex-1">
            <div className="bg-slate-100">
                <p className="text-4xl p-4">Title</p>
            </div>
            <CurrentPath className="pl-4" />
        </div>
    )
}

export default function BaseLayout ( {children} ) {
    return (
        <div className="flex h-screen">
            <LeftPanel className="h-full" />
            <div className="flex flex-col w-full">
                <TopPanel />
                <div className="h-full bg-slate-200">
                    {children}
                </div>
            </div>
        </div>
    )
}