'use client'

import BaseLayout from "@/main";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";


export default function Project () {

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

    const newProject = async () => {
        await fetch ("/api/saveData", {method: "POST", body: JSON.stringify({
            "name":"monprojet",
            "data":[],
            "action":"create"
        })})
        .then((res) => console.log(res.json()))
    }

    return <div>
        <BaseLayout>
        <button onClick={() => fetchData()}>fetch</button>
        
           {allData.map((name) => (
        <div key={name}>
          {name}
        </div>
      ))}

      <div className="p-6">
        <div className="flex gap-10">
            <button onClick={() => newProject()} className="bg-slate-50 rounded-xl p-4">
                <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 128}}></FontAwesomeIcon>
            </button>
        </div>
      </div>

        </BaseLayout>
    </div>
}