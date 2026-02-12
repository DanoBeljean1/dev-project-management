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
import { useRef } from "react"
import { jsx } from "react/jsx-runtime"


function LifePath ( props ) {

    const projectId = useParams().projectId
    const [allData, setAllData] = useState([])


    const fetchData = async () => {
            const response = await fetch("/api/getAllData");
    
            if (response.ok) {
                const data = await response.json()
                const names = Object.keys(data[0].projects);

                console.log(names)
                console.log(data[0].projects[projectId].lifepath)

                setAllData(names);
                props.setProjectData(data[0].projects[projectId].lifepath)
                props.setProjectRoadMap(data[0].projects[projectId].roadmap)
                console.log("rdmp, ", data[0].projects[projectId].roadmap)
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
        
        await fetch("/api/saveData", {method: "POST", body: JSON.stringify(
            {
                "name":projectId,
                "data":props.projectData,
                "action":"update"
            }
        )})
        .then((res) => console.log(res.json()))
    }

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
    return (
        <div className="basis-1/2 p-12 pl-15">
            {props.projectData.map((name, index) => (
                <div key={index} className="pb-4">
                
                <div className="flex items-center gap-5 relative">
                    <div className="flex flex-col">
                        
                    <FontAwesomeIcon icon={(name.status) ? faCheckCircle : faClock} style={{color: "white", fontSize: "32px", backgroundColor: (name.status) ? "#9ccd93" : "#9eb4d7"}} className="p-2 px-1 rounded-full border-2 border-slate-100 shadow transition-all duration-200"></FontAwesomeIcon>
                        <div className="flex h-full">
                            <div className="relative basis-1/2">
                                <div className="absolute left-full top-[0px] border-slate-100 border border-0 border-l-2 h-30"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 w-full border border-slate-300 shadow p-4 rounded-lg">
                        
                        <div className="flex justify-between">
                            {(editing.title == (index + 1)) ? <input type="text" className="border border-slate-400 border-2 bg-white rounded-lg p-1 px-2" autoFocus={true} aria-selected value={props.tempData} onChange={e => props.setTempData(e.target.value)} onKeyDown={e => {
                                switch (e.key) {
                                    case "Enter":
                                        setEditing(defaultEditing)
                                        let temp = props.projectData
                                        temp[index].title = props.tempData
                                        props.setProjectData(temp)
                                        sendData()
                                        break;
                                    case "Tab":
                                        setEditing(editingDescription(index))
                                        props.setTempData(name.description)
                                        break;
                                    default:
                                        break;
                                }
                            }}></input> : <p onClick={() => {setEditing(editingTitle(index)); props.setTempData(name.title)}} className="font-semibold">{name.title}</p>}
                            
                            <div style={{backgroundColor: (name.status) ? "#b3eebf" : "#9eb4d7", color: (name.status) ? "#4f9f60" : ""}} className={`text-xs p-1 h-min px-4 border border-slate-200 rounded-lg shadow-lg cursor-pointer hover:brightness-90 active:outline-2 outline-offset-2 outline-blue-300 transition-all duration-200`} onClick={() => {
                                let temp = props.projectData.slice()
                                temp[index].status = !temp[index].status
                                props.setProjectData(temp)
                            }}>{(name.status) ? "Terminé" : "Actuel"}</div></div>
                        {(editing.description == (index + 1)) ? <textarea type="text" className="w-full border border-slate-400 border-2 bg-white rounded-lg p-1 px-2" autoFocus={true} aria-selected value={props.tempData} onChange={e => props.setTempData(e.target.value)} onKeyDown={e => {
                                switch (e.key) {
                                    case "Enter":
                                        setEditing(defaultEditing)
                                        let temp = props.projectData
                                        temp[index].description = props.tempData
                                        props.setProjectData(temp)
                                        sendData()
                                        break;
                                    case "Tab":
                                        setEditing(editingTitle(((index+1)%props.projectData.length)))
                                        props.setTempData(name.description)
                                        break;
                                    default:
                                        break;
                                }
                            }}></textarea> : <p onClick={() => {setEditing(editingDescription(index)); props.setTempData(name.description)}}>{name.description}</p>}
                        <div className="flex items-center gap-2 pt-4">
                            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                            <p className="">{(new Date(name.date)).toDateString()}</p>
                        </div>
                        </div>
                        
                </div>
                </div>
                ))}
                <div className="flex items-center gap-2 p-2 pl-4 mt-8 text-slate-600 cursor-pointer border border-slate-200 bg-slate-100 rounded-xl shadow hover:brightness-90 active:brightness-85 active:outline-2 outline-offset-2 outline-blue-300">
                    <FontAwesomeIcon icon={faBarsStaggered}></FontAwesomeIcon>
                    <p>fin du projet</p>
                </div>
                
        </div>
    )
}

function RoadMap ( {projectRoadMap, setProjectRoadMap, currentView} ) {

    // const [boxNames, setBoxNames] = useState([{"parent":"Informations principales", "child":[{"name":"Description", "value":""}, {"name":"Objectif principal", "value":""}, {"name":"Publique cible", "value":""}, {"name":"Niveau de difficulté", "value":""}]}])
    const projectId = useParams().projectId
    const [showSaveButton, setShowSaveButton] = useState(-1)
    const refs = useRef([])

    const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };


    const sendData = async () => {
        await fetch("/api/saveData", {method: "POST", body: JSON.stringify({
            "name":projectId,
            "data":projectRoadMap,
            "action":"roadmap"
        })}).then((res) => console.log(res.json()))
    }

    useEffect(() => {
        let r = 0
        for (let index = 0; index < projectRoadMap.length; index++) {
            
            for (let ind = 0; ind < projectRoadMap[index].child.length; ind++) {
                let temparea = projectRoadMap.slice()
                
                temparea[index].child[ind].value = refs.current[r].value
                console.log(temparea)
                setProjectRoadMap(temparea);

                refs.current[r].style.height = "25px"
                refs.current[r].style.height = refs.current[r].scrollHeight + "px"
                r++
            }
        }
        
    }, [currentView])

    return (
        <div className="flex w-full">
            <div className="p-8 basis-2/3">
            
                    {projectRoadMap.map((value, index) => (
                        <div key={index} className="pb-10">
                            <div className="p-6 bg-slate-50 shadow rounded-xs" onMouseLeave={() => setShowSaveButton(-1)} onMouseOver={() => setShowSaveButton(index)}>
                                <div className="flex justify-between"><p className="text-2xl font-bold">{value.parent}</p>
                                   { (index == showSaveButton) ? <button onClick={() => sendData()} className="bg-blue-300 px-2 rounded-lg cursor-pointer border-1 border-blue-400 hover:bg-blue-400 active:bg-blue-200">save all</button>
                             : <div></div>
                                }</div>
                            
                            {value.child.map((child, ind) => (

                                <div key={ind}>
                                    <p className="text-xl pt-3">{child.name}</p>
                                    <textarea ref={addToRefs} className={`textarea overflow-y-auto pl-4 border-l-2 border-slate-500 w-full bg-white`} style={{height: "25px", resize: "none"}} value={child.value} onChange={(e) => {
                                    
                                    let temparea = projectRoadMap.slice()
                                    temparea[index].child[ind].value = e.target.value
                                    setProjectRoadMap(temparea);

                                    e.target.style.height = "25px"
                                    e.target.style.height = e.target.scrollHeight + "px"

                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            sendData()
                                        }
                                    }}
                                    onMouseOver={(e) => {
                                        let temparea = projectRoadMap.slice()
                                        temparea[index].child[ind].value = e.target.value
                                        setProjectRoadMap(temparea);

                                        e.target.style.height = "25px"
                                        e.target.style.height = e.target.scrollHeight + "px"
                                    }}
                                    ></textarea>
                                </div>
                            ))}
                            
                        </div>
                        </div>
                    ))}
        <div className="basis-1/3"></div>
        </div>
        </div>
        
    )
}


export default function ProjectDetails () {
    

    const [tempData, setTempData] = useState('')
    const [projectData, setProjectData] = useState([{"chargement":"..."}])
    const [projectRoadMap, setProjectRoadMap] = useState([])

    const [currentView, setCurrentView] = useState("lifepath")


    return (<div>
        <BaseLayout projectData={projectData} setProjectData={setProjectData}>
                <div className="flex relative h-full">
                    
                    {(currentView == "lifepath") && <LifePath projectRoadMap={projectRoadMap} setProjectRoadMap={setProjectRoadMap} projectData={projectData} setProjectData={setProjectData} tempData={tempData} setTempData={setTempData} />}
                    {(currentView == "roadmap") && <RoadMap currentView={currentView} projectRoadMap={projectRoadMap} setProjectRoadMap={setProjectRoadMap} />}

                    <div className="absolute bottom-10 w-full flex justify-center pb-10">
                    <div className="bg-white shadow fixed flex rounded-full overflow-hidden">
                        <button onClick={() => setCurrentView("lifepath")} className="p-2 m-2 rounded-full hover:bg-blue-300 hover:cursor-pointer">Life path</button>
                        <button onClick={() => setCurrentView("roadmap")} className="p-2 m-2 rounded-full hover:bg-blue-300 hover:cursor-pointer">Roadmap</button>
                        <button className="p-2 m-2 rounded-full hover:bg-blue-300 hover:cursor-pointer">View</button>
                    </div>
                </div>
                </div>

                
        </BaseLayout>
    </div>)
}

/*
sauvegarde roadmap

"roadmap": [
        {
          "parent": "Informations principales",
          "child": [
            {
              "name": "Description",
              "value": "Ici il faut mettre une descriptiondonc je mets une description"
            },
            {
              "name": "Objectif principal",
              "value": "l'objectif principal est de..."
            },
            {
              "name": "Publique cible",
              "value": ""
            },
            {
              "name": "Niveau de difficulté",
              "value": ""
            }
          ]
        },
        {
          "parent": "Problématique et idées",
          "child": [
            {
              "name": "Valeur ajoutée du projet",
              "value": "Ici il faut mettre une descriptiondonc je mets une description"
            },
            {
              "name": "Technologies apprises durant le projet",
              "value": "l'objectif principal est de..."
            },
            {
              "name": "Fonctionnalitées clés",
              "value": ""
            },
            {
              "name": "Fonctionnalitées secondaires",
              "value": ""
            }
          ]
        },
        {
          "parent": "Technologies",
          "child": [
            {
              "name": "Frontend",
              "value": "Ici il faut mettre une descriptiondonc je mets une description"
            },
            {
              "name": "Backend",
              "value": "l'objectif principal est de..."
            },
            {
              "name": "Base de données",
              "value": ""
            }
          ]
        },
        {
          "parent": "Déploiement et évolutions futures",
          "child": [
            {
              "name": "Hébergement",
              "value": "Ici il faut mettre une descriptiondonc je mets une description"
            },
            {
              "name": "Nom de domaine",
              "value": "l'objectif principal est de..."
            },
            {
              "name": "Évolutions futures",
              "value": ""
            }
          ]
        }
      ]
*/