'use client'

import BaseLayout from "@/main"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { faCheckCircle, faClose, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"
import  {formatDate} from "src/date"


function LifePath ( props ) {

    const projectId = useParams().projectId
    const [allData, setAllData] = useState([])
    const [showCommentSection, setShowCommentSection] = useState(true)
    const [displayedTags, setDisplayedTags] = useState([])
    const [comments, setComments] = useState([])
    const [currentComment, setCurrentComment] = useState("")
    const [tagHover, setTagHover] = useState(1)
    const [deleteComment, setDeleteComment] = useState(null)

    let tags = ["important", "amélioration", "explorer", "revoir", "frontend", "backend", "bug"]
    const tagsColors = ["orange", "amber", "yellow", "lime", "indigo", "blue", "slate", "red", "emerauld", "teal", "cyan", "sky"]

    const colorMap = {
        orange: "bg-orange-500",
        
        yellow: "bg-yellow-500",
        lime: "bg-lime-500",
        indigo: "bg-indigo-500",
        emerauld: "bg-emerald-500",
        blue: "bg-blue-500",
        slate: "bg-slate-500",
        red: "bg-red-500",
        
        teal: "bg-teal-500",
        amber: "bg-amber-500",
        cyan: "bg-cyan-500",
        sky: "bg-sky-500",
}

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
                setComments(data[0].projects[projectId].comments)

                console.log("rdmp, ", data[0].projects[projectId].roadmap)
                console.log("projectdata, ", data[0].projects[projectId].lifepath)
                console.log(data[0].projects[projectId].comments)
                  
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

    const sendComment = async (del) => {

        let temp = comments.slice()
        if (del>0) {
            temp.splice(del-1, 1)
            
        }
        else {
            temp.push({texte: currentComment, tags: displayedTags, date: new Date()})
        }
        

        setComments(temp)
        setCurrentComment("")

        await fetch("/api/saveData", {method: "POST", body: JSON.stringify(
            {
                "name":projectId,
                "data":temp,
                "action":"comment"
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
        <div className="flex w-full select-none">
        <div className={`${(showCommentSection) ? "basis-1/2" : "basis-full"} transition-all duration-200 p-12 pl-15`}>
            {props.projectData.map((name, index) => (
                <div key={index} className="pb-4">
                
                <div className="flex items-center gap-2 relative">
                    <div className="flex flex-col">
                        
                    <FontAwesomeIcon icon={(name.status) ? faCheckCircle : faClock} style={{color: "white", fontSize: "32px", backgroundColor: (name.status) ? "#9ccd93" : "#9eb4d7"}} className="p-2 px-1 rounded-full border-2 border-slate-100 shadow transition-all duration-200"></FontAwesomeIcon>
                        <div className="flex h-full">
                            <div className="relative basis-1/2">
                                <div className="absolute left-full top-[0px] border-slate-100 border border-0 border-l-2 h-30"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 w-full border border-slate-300 shadow p-4 pl-5 rounded-lg hover:brightness-95">
                        
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
                        {(editing.description == (index + 1)) ? <textarea type="text" className="w-full border border-slate-400 border-2 bg-white rounded-lg p-1 px-2" autoFocus={true} value={props.tempData} onChange={e => props.setTempData(e.target.value)} onKeyDown={e => {
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
                        <div className="flex items-center gap-2 pt-4 text-(--color-slate-500)">
                            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                            <p className="text-(--color-slate-500)">{(new Date(name.date)).toDateString()}</p>
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
        <div className={`${(showCommentSection) ? "basis-1/2" : "basis-1 hover:brightness-95 active:brightness-90"} shadow-xl transition-all duration-200 bg-slate-50 h-full w-full`} onClick={() => {
            if (!showCommentSection) {
                setShowCommentSection(true)
            }
        }}>
                <div className={`w-full h-14 flex justify-between text-slate-600 p-2 bg-slate-100`}>
                    <div className={`text-2xl flex items-end font-bold`}>{(showCommentSection) ? <p className="pl-10">Comment Section</p> : ""} </div>
                    <button className="p-1 rounded-lg hover:bg-slate-200 active:bg-slate-300 cursor-pointer" onClick={() => setShowCommentSection(false)}>
                            <FontAwesomeIcon className="transition-all duration-200" style={{transform: (showCommentSection) ? "" : "rotate(45deg)"}} icon={faClose}></FontAwesomeIcon>
                    </button>
                </div>
                {
                    (showCommentSection) && <div className="pl-8 p-6 flex flex-col h-[calc(100%-56px)] min-h-0">
                        <div className="h-28 flex flex-col">
                            <textarea className="basis-2/3 w-full border-1 border-slate-500 rounded-xs bg-white" value={currentComment} onChange={(e) => setCurrentComment(e.target.value)}></textarea>
                            <div className="basis-1/3 flex justify-between pt-2 items-center">
                                <div className="flex w-80 overflow-x-scroll gap-1 [&::-webkit-scrollbar]:hidden 
            [-ms-overflow-style:none]
            [scrollbar-width:none]" onWheel={(e) => {
                                    e.currentTarget.scrollLeft += e.deltaY
                                }}>
                                    {tags.map((tag, index) => (
                                        <div key={index} className={`${(displayedTags[index]) ? `${colorMap[tagsColors.sort()[index]]} border-slate-50` : "bg-slate-50 border-indigo-400"} items-center flex border-2 cursor-pointer transition-all duration-100 px-3 rounded-full`} onClick={() => {
                                            let temp = displayedTags.slice()
                                            temp[index] = !temp[index]
                                            setDisplayedTags(temp)
                                        }}>{tag}</div>
                                    ))}
                                </div>
                                
                                <button className="bg-blue-200 px-3 rounded-lg shadow border-1 cursor-pointer border-blue-300 hover:bg-blue-300 active:bg-blue-400 active:outline-2 outline-blue-400 outline-offset-2" onClick={(e) => {
                                    sendComment(0)
                                }}>publier</button>
                            </div>
                        </div>
                        <div className="pt-5 flex-1 min-h-0 overflow-y-auto flex flex-col gap-3">
                            {
                            (comments.length>0) ? comments.map((comment, index) => (
                                
                                <div key={index} className="relative pl-2 border-l-2 border-blue-400 flex justify-between hover:bg-blue-200 cursor-pointer" onClick={() => setDeleteComment(index)} onMouseLeave={() => setDeleteComment(null)}>
                                    <div>
                                        {comment.texte}
                                        <p className="text-slate-400 italic text-xs">{formatDate(comment.date)}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {comment.tags.map((tag, ind) => (
                                            (tag) ? <div name={ind} key={ind} className={`${colorMap[tagsColors.sort()[ind]]} p-2 rounded-full transition-all duration-500`} style={{ maxWidth: (tagHover==ind) ? "500px" : "0px" }} onMouseOver={() => setTagHover(ind)} onMouseLeave={() => {setTagHover(null); console.log(tagHover)}}>{(tagHover==ind) && tag}  </div>
 : <div key={ind}></div>
                                        ))}
                                    </div>
                                    {(deleteComment==index) && <div className="absolute w-full h-full bg-red-400 left-0 flex items-center justify-center cursor-pointer hover:bg-red-500 active:bg-red-600 active:outline-2 outline-offset-2 outline-blue-400" onClick={() => sendComment(index+1)}>
                                        <FontAwesomeIcon className="text-red-100" icon={faTrash}/>
                                    </div>}
                                    </div>
                            )) : <div className="italic text-slate-400"><p>aucun commentaires pour l'instant</p>
                            </div>
                        }
                        </div>
                    </div>
                }
            
        </div>
        </div>
    )
}

function RoadMap ( {projectRoadMap, setProjectRoadMap, currentView} ) {

    // const [boxNames, setBoxNames] = useState([{"parent":"Informations principales", "child":[{"name":"Description", "value":""}, {"name":"Objectif principal", "value":""}, {"name":"Publique cible", "value":""}, {"name":"Niveau de difficulté", "value":""}]}])
    const projectId = useParams().projectId
    const [showSaveButton, setShowSaveButton] = useState(-1)
    const refs = useRef([])
    const [toggleAccordeon, setToggleAccordeon] = useState([true, true, true, true])

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
                                <div className="flex justify-between"><div className="flex items-center gap-3"><button className="rounded-lg hover:bg-slate-200 active:bg-slate-300" onClick={() => {
                                    let temp = toggleAccordeon.slice()
                                    temp[index] = !temp[index]
                                    setToggleAccordeon(temp)
                                }}><FontAwesomeIcon icon={(toggleAccordeon[index]) ? faAngleDown : faAngleRight}></FontAwesomeIcon></button><p className="text-2xl font-bold">{value.parent}</p></div>
                                   { (index == showSaveButton) ? <button onClick={() => sendData()} className="bg-blue-300 px-2 rounded-lg cursor-pointer border-1 border-blue-400 hover:bg-blue-400 shadow active:bg-blue-200">save all</button>
                             : <div></div>
                                }</div>
                            
                            {value.child.map((child, ind) => (

                                <div key={ind} className={`${(toggleAccordeon[index]) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} transition-all duration-300`}>
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
                    </div>
        <div className="basis-1/3 p-8">
        
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
                        <button onClick={() => setCurrentView("lifepath")} className={`p-2 m-2 ${(currentView == "lifepath") ? "shadow-lg" : ""} rounded-full hover:bg-blue-300 cursor-pointer active:brightness-85 active:outline-2 outline-offset-2 outline-blue-300`}>Life path</button>
                        <button onClick={() => setCurrentView("roadmap")} className={`p-2 m-2 ${(currentView == "roadmap") ? "shadow-lg" : ""} rounded-full hover:bg-blue-300 cursor-pointer active:brightness-85 active:outline-2 outline-offset-2 outline-blue-300`}>Roadmap</button>
                        <button onClick={() => setCurrentView("view")} className={`p-2 m-2 rounded-full hover:bg-blue-300 ${(currentView == "view") ? "shadow-lg" : ""} cursor-pointer active:brightness-85 active:outline-2 outline-offset-2 outline-blue-300`}>View</button>
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