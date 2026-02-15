'use client'

import BaseLayout from "@/main";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlusSquare } from "@fortawesome/free-solid-svg-icons";


function DialogBox ( {setShowDialogBox} ) {
    const [dialogValue, setDialogValue] = useState(`nouveau_projet_${Math.floor(Math.random()*100000)}`)
    
    const newProject = async (name) => {
        await fetch ("/api/saveData", {method: "POST", body: JSON.stringify({
            "name":name,
            "data":[],
            "action":"create"
        })})
        .then((res) => console.log(res.json()))
    }

    return (
        <div className="fixed top-0 left-0 bg-slate-500/25 w-full h-full opacity-100 justify-center items-center flex">
            <div className="bg-white p-4 border-1 border-slate-400 rounded-xl shadow">
                <div className="flex justify-between">
                    <p className="text-xl pb-3 w-96">Entrer le nom du projet</p>
                    <div className="-mt-3 -mr-3 ">
                        <button className="p-1 rounded-lg hover:bg-slate-200 active:bg-slate-300" onClick={() => setShowDialogBox(false)}>
                            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                        </button>
                    </div>
                    
                </div>
                <div className="flex gap-5">
                    <input type="text" className="border-1 w-full border-slate-400 shadow rounded-lg p-2" value={dialogValue} onChange={(e) => setDialogValue(e.target.value)}></input>
                    <button className="bg-slate-200 px-4 rounded-xl border-1 border-slate-400 shadow hover:bg-slate-300 active:outline-2 outline-offset-1 outline-blue-400 active:bg-blue-100" onClick={() => {
                        newProject(dialogValue)
                        setShowDialogBox(false)
                    }}>create</button>
                </div>
            </div>
        </div>
        
    )
}

export default function Project () {

    const [showDialogBox, setShowDialogBox] = useState(false)

    return <div>
        <BaseLayout>
        

            <div className="p-6">
                <div className="flex gap-10">
                    <button onClick={() => setShowDialogBox(true)} className="cursor-pointer bg-slate-50 hover:bg-slate-100 active:bg-white rounded-xl p-4 text-slate-700">
                        <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 128}}></FontAwesomeIcon>
                        <p className="text-xl pt-2">Créer un projet</p>
                    </button>
                </div>
            </div>
            {(showDialogBox) ? <DialogBox setShowDialogBox={setShowDialogBox} /> : <></>}

        </BaseLayout>
    </div>
}