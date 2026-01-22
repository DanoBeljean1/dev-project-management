'use client'
import BaseLayout from "@/main"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons"

export default function ProjectDetails () {
    const projectId = useParams().projectId

    const [allData, setAllData] = useState([])
    
        const fetchData = async () => {
            const response = await fetch("/api/getAllData");
    
            if (response.ok) {
                const data = await response.json()
                const names = Object.keys(data[0].projects);
                console.log(names)
                setAllData(names);
    
            }
            else {
                console.log("Error while fetching data.")
            }
        }

    useEffect(() => {
        fetchData()
    }, [])

    // fetchData()

    return (<div>
        <BaseLayout>
                <div className="flex">
                    <div className="basis-1/2 p-8">
                        {allData.map((name) => (
                            <div key={name} className="">
                            
                            <div className="flex items-center gap-5 relative">
                                <div className="flex flex-col">
                                    
                                <FontAwesomeIcon icon={faCheckCircle} style={{color: "white", fontSize: "32px"}} className="bg-[#9ccd93] p-2 px-1 rounded-full border-2 border-slate-100"></FontAwesomeIcon>
                                    <div className="flex h-full">
                                        <div className="relative basis-1/2">
                                            <div className="absolute left-full top-[0px] border-slate-100 border border-0 border-l-2 h-15"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 w-full border border-slate-400 p-4 rounded-lg">
                                    
                                    <div className="flex justify-between"><p className="font-semibold">Plannififation initiale</p><div className="bg-[#b3eebf] text-[#4f9f60] text-xs p-1 px-4 border border-[#4f9f60] rounded-lg">terminé</div></div>
                                    <p>Une description de la tâche</p>
                                    <div className="flex items-center gap-2 pt-4">
                                        <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                                        <p className="">Lun. 5 janvier</p>
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
                </div>
                
        </BaseLayout>
    </div>)
}