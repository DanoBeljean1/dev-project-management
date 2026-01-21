'use client'

import BaseLayout from "@/main";
import { useState } from "react";


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

    return <div>
        <BaseLayout>
        <button onClick={() => fetchData()}>fetch</button>
        
           {allData.map((name) => (
        <div key={name}>
          {name}
        </div>
      ))}

        </BaseLayout>
    </div>
}