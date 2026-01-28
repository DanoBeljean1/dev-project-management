'use client'

import BaseLayout from "@/main"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons"
import { jsx } from "react/jsx-runtime"

export default function ProjectDetails () {
    const projectId = useParams().projectId

    const [allData, setAllData] = useState([])
    const [tempData, setTempData] = useState('')
    const [projectData, setProjectData] = useState([{"chargement":"..."}])
    const [editing, setEditing] = useState({
        "title":0,
        "description":0
    })

    const editingTitle = (tile) => ({
        "title":tile+1,
        "description":0
    })

    const editingDescription = (tile) => ({
        "title":0,
        "description":tile+1
    })

    const defaultEditing = () => ({
        "title":0,
        "description":0
    })


    
        const fetchData = async () => {
            const response = await fetch("/api/getAllData");
    
            if (response.ok) {
                const data = await response.json()
                const names = Object.keys(data[0].projects);

                console.log(names)
                console.log(data[0].projects[projectId].lifepath)

                setAllData(names);
                setProjectData(data[0].projects[projectId].lifepath)
                console.log("projectdata, ", data[0].projects[projectId].lifepath)
                  
            }
            else {
                console.log("Error while fetching data.")
            }
        }

        useEffect(() => {
        fetchData()
    }, [])

    const sendData = async () => {
        
        const response = await fetch("/api/saveData", {method: "POST", body: JSON.stringify(
            {
                "name":projectId,
                "data":projectData,
                "action":"update"
            }
        )})
        .then((res) => console.log(res.json()))
    }


    return (<div>
        <BaseLayout projectData={projectData} setProjectData={setProjectData}>
                <div className="flex relative h-full">
                    <div className="basis-1/2 p-8">
                        {projectData.map((name, index) => (
                            <div key={index} className="pb-4">
                            
                            <div className="flex items-center gap-5 relative">
                                <div className="flex flex-col">
                                    
                                <FontAwesomeIcon icon={(name.status) ? faCheckCircle : faClock} style={{color: "white", fontSize: "32px", backgroundColor: (name.status) ? "#9ccd93" : "#9eb4d7"}} className="p-2 px-1 rounded-full border-2 border-slate-100"></FontAwesomeIcon>
                                    <div className="flex h-full">
                                        <div className="relative basis-1/2">
                                            <div className="absolute left-full top-[0px] border-slate-100 border border-0 border-l-2 h-30"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 w-full border border-slate-400 p-4 rounded-lg">
                                    
                                    <div className="flex justify-between">
                                        {(editing.title == (index + 1)) ? <input type="text" className="border border-slate-400 border-2 bg-white rounded-lg p-1 px-2" autoFocus={true} aria-selected value={tempData} onChange={e => setTempData(e.target.value)} onKeyDown={e => {
                                            switch (e.key) {
                                                case "Enter":
                                                    setEditing(defaultEditing)
                                                    let temp = projectData
                                                    temp[index].title = tempData
                                                    setProjectData(temp)
                                                    sendData()
                                                    break;
                                                case "Tab":
                                                    setEditing(editingDescription(index))
                                                    setTempData(name.description)
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}></input> : <p onClick={() => {setEditing(editingTitle(index)); setTempData(name.title)}} className="font-semibold">{name.title}</p>}
                                        
                                        <div style={{backgroundColor: (name.status) ? "#b3eebf" : "#9eb4d7", color: (name.status) ? "#4f9f60" : ""}} className="text-xs p-1 h-min px-4 border border-slate-500 rounded-lg" onClick={() => {
                                            let temp = projectData.slice()
                                            temp[index].status = !temp[index].status
                                            setProjectData(temp)
                                        }}>{(name.status) ? "Terminé" : "Actuel"}</div></div>
                                    {(editing.description == (index + 1)) ? <textarea type="text" className="w-full border border-slate-400 border-2 bg-white rounded-lg p-1 px-2" autoFocus={true} aria-selected value={tempData} onChange={e => setTempData(e.target.value)} onKeyDown={e => {
                                            switch (e.key) {
                                                case "Enter":
                                                    setEditing(defaultEditing)
                                                    let temp = projectData
                                                    temp[index].description = tempData
                                                    setProjectData(temp)
                                                    sendData()
                                                    break;
                                                case "Tab":
                                                    setEditing(editingTitle(((index+1)%projectData.length)))
                                                    setTempData(name.description)
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}></textarea> : <p onClick={() => {setEditing(editingDescription(index)); setTempData(name.description)}}>{name.description}</p>}
                                    <div className="flex items-center gap-2 pt-4">
                                        <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                                        <p className="">{(new Date(name.date)).toDateString()}</p>
                                    </div>
                                    </div>
                                    
                            </div>
                            </div>
                            ))}
                            <div className="flex items-center gap-2 p-2 pl-4 mt-8 text-slate-600 border border-slate-300 bg-slate-100 rounded-xl">
                                <FontAwesomeIcon icon={faBarsStaggered}></FontAwesomeIcon>
                                <p>fin du projet</p>
                            </div>
                            
                    </div>
                    <div className="basis-1/2"></div>

                    <div className="absolute bottom-0 w-full flex justify-center pb-10">
                    <div className="bg-white flex rounded-full overflow-hidden">
                        <button className="p-2 m-2 rounded-full hover:bg-blue-300 hover:cursor-pointer">Life path</button>
                        <button className="p-2 m-2 rounded-full hover:bg-blue-300 hover:cursor-pointer">Roadmap</button>
                        <button className="p-2 m-2 rounded-full hover:bg-blue-300 hover:cursor-pointer">View</button>
                    </div>
                </div>
                </div>

                
        </BaseLayout>
    </div>)
}