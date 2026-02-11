'use client'

import Link from "next/link";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowTurnDown, faAngleRight, faWindowMinimize, faWindowMaximize, faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import {capitalize} from "src/capitalize"
import { useEffect } from "react";


/*
COULEURS -> Slate ou blue
*/


export function CurrentPath() {
    
    const pathname = usePathname().split("/")
    const [confirmDelete, setConfirmDelete] = useState(false)
    const projectId = useParams().projectId

    const styles = {
        color: "blue",
        textDecoration: "underline"
    }

    return (
        <div className="flex justify-between">
            <div className="pl-4 bg-white">{pathname.map((segment, index) => (<a style={styles} href={pathname.slice(0, index+1).join("/")} key={index}>{segment}/</a>))}</div>
            <div className="px-4 flex items-center cursor-pointer" style={styles}>{(confirmDelete) ? <div className="flex gap-4"><a  onClick={() => {
                fetch("/api/saveData", {method: "POST", body: JSON.stringify(
                    {
                        "name":projectId,
                        "data":"",
                        "action":"delete"
                    }
                )})
            }} href="/routes/project">confirmer</a><button onClick={() => setConfirmDelete(false)}>non</button></div> : <button onClick={() => {setConfirmDelete(true)}}>supprimer</button>}</div>
        </div>
    )
}

function Route () {

    const [currentLoc, setCurrentLoc] = useState('')
    const pathname = usePathname()
    const [allData, setAllData] = useState([])

    const fetchData = async () => {
        const response = await fetch("/api/getAllData");

        if (response.ok) {
            const data = await response.json()
            const names = Object.keys(data[0].projects);
            setAllData(names);

        }
        else {
            console.log("Error while fetching data.")
        }
    }

    const navigation = (loc) => ({
        backgroundColor: pathname.endsWith(loc) | pathname.endsWith("0") && "rgb(223, 229, 237)",
        padding: "10px",
        paddingLeft: "30px",
        borderRadius: "10px"
    })

    useEffect(() => {
        if (pathname.endsWith("/project"))
            {fetchData()}
    }, [])

    

    return (
        <div className="flex flex-col text-xl gap-1 " >
            <Link style={navigation("/")} onClick={() => setCurrentLoc("/")} href="/">Dashboards</Link>
            <Link style={navigation("technologies")} onClick={() => setCurrentLoc("technologies")} href="/routes/technologies">Technologies</Link>
            <Link style={navigation("project")} className="w-64" onClick={() => {}} href="/routes/project"><div className="flex justify-between">All Projects<div className="flex flex-col justify-center"><FontAwesomeIcon icon={(allData.length == 0) ? faAngleRight : faAngleDown} style={{color: "grey"}}></FontAwesomeIcon></div></div></Link>
            <div style={{paddingLeft: "30px"}}>
                {allData.map((name) => (
                    <a href={"project/"+name} key={name} className="flex items-center gap-4">
                    <FontAwesomeIcon className="p-auto" style={{transform: "", color: "rgba(0, 0, 0, 0.25)"}} icon={faFolder}></FontAwesomeIcon>
                        <p>{name}</p>
                        </a>
                    ))}
            </div>
            
            <Link style={navigation("execute")} onClick={() => setCurrentLoc("execute")} href="/routes/execute">Execute</Link>
        </div>
    )
}
 
function TopPanelAction ( {projectData, setProjectData} ) {
    const pathname = usePathname().split("/")

    const addPath = async () => {
        await fetch("/api/saveData", {method: "POST", body: JSON.stringify({
            "name":pathname[pathname.length-1],
            "data":projectData,
            "action":"addpath"
        })}).then((res) => console.log(res.json()))
    }


    if (pathname[pathname.length -2] == "project") {
        return (
            <div className="flex gap-5 ">
                <button className="p-3 bg-white rounded-xl border-2 border-blue-200 text-blue-300 cursor-pointer hover:bg-blue-300 hover:text-white">Roadmap du projet</button>
                    <div className="bg-blue-200 rounded-xl text-white flex justify-between overflow-hidden">
                        <button onClick={() => {
                            let tempProj = projectData.slice()
                            let date = new Date()
                            
                            tempProj.push({"title":"new", "description":"new", "date":`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`, "status":0})
                            setProjectData(tempProj)

                            console.log(projectData)
                            addPath()

                }} className="p-3 cursor-pointer hover:bg-blue-300">Ajouter étape</button>
                        <div className=" border-l-2 opacity-75"></div>
                        <button onClick={() => console.log("drop down")} className="cursor-grab hover:bg-blue-300">
                            <FontAwesomeIcon className="p-3" icon={faAngleDown}></FontAwesomeIcon>
                        </button>
                    </div>
            </div>
        )
    }
}

function LeftPanel ( {open} ) {
    return (
        <div className={`top-0 left-0 bg-slate-50 ${(open) ? `w-[400px] p-6` : `w-[0px] p-0`} transition-all duration-300`} >
            <Route />
        </div>
    )
}

function TopPanel ( {sideBarOpen, setSideBarOpen, projectData, setProjectData} ) {
    const pathname = usePathname().split("/")
    return (
        <div className="flex-1">
            <div className="bg-slate-100 flex justify-between items-center p-4">
                <div className="flex items-center gap-5">
                    <button onClick={() => setSideBarOpen(!sideBarOpen)}><FontAwesomeIcon icon={faWindowMaximize} style={{transform: "scaleX(-1)", fontSize: "24px"}}></FontAwesomeIcon></button>
                    
                    <p className="text-4xl">{capitalize(pathname[pathname.length - 1].replace("_", " "))}</p>
                </div>
                
                <TopPanelAction projectData={projectData} setProjectData={setProjectData}></TopPanelAction>
            </div>
            <CurrentPath />
        </div>
    )
}

export default function BaseLayout ( {children, projectData, setProjectData} ) {

    const [sideBarOpen, setSideBarOpen] = useState(true)
    

    return (
        <div className="flex h-screen w-full fixed">
            
            <LeftPanel className="h-full" open={sideBarOpen}/>
            <div className="flex flex-col w-full" style={{boxShadow: "inset 8px 0 10px -5px rgba(0, 0, 0, 0.2)"}}>
                <TopPanel sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} projectData={projectData} setProjectData={setProjectData} />
                <div className="overflow-scroll h-full bg-slate-200 " style={{boxShadow: "inset 8px 0 10px -5px rgba(0, 0, 0, 0.2)"}}>
                    {children}
                </div>
            </div>
        </div>
    )
}

// npm run dev -- -H 0.0.0.0 -p 3000
//