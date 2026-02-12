'use client'

import Image from "next/image";
import BaseLayout from "./main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock, faPlus} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";



export default function Home() {

  const styles = {
    box: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "10px",
      boxShadow: "1px 1px 6px #00000041"
    },
    underlined: {
      textDecoration: "none",
      backgroundImage: "linear-gradient(indigo, indigo)",
      backgroundSize: "50% 4px",
      backgroundPosition: "0 90%",
      backgroundRepeat: "no-repeat"
    }
  }

  const underlined = (c, w) => ({
    textDecoration: "none",
      backgroundImage: `linear-gradient(${c}, ${c})`,
      backgroundSize: `${(w) ? "100%" : "50%"} 3px`,
      backgroundPosition: "0 100%",
      backgroundRepeat: "no-repeat",
      transition: "all 0.3s"
  })

  const [textHover, setTextHover] = useState([false, false, false, false, false])

  return (

    <div>
      

      <BaseLayout>
      
      <div className="p-10 pb-0 text-[64px] text-[#4e6e79] font-semibold">
        <div className="w-min text-nowrap flex" style={underlined("oklch(77.7% 0.152 181.912)", textHover[4])} onMouseOver={() => setTextHover([false, false, false, false, true])} onMouseLeave={() => setTextHover([false, false, false, false, false])}>
          Welcome back
        </div>
      </div>
        <div className="p-10 flex flex-col gap-5">
          <div className="bg-slate-50 rounded-xl shadow-lg p-6">
            <p className="text-2xl pb-2 font-bold">Activitées</p>
            <div className="flex gap-6">
              
              <div style={styles.box} className="basis-1/3">Tracker d'activités</div>
              <div style={styles.box} className="basis-2/3">Activités récentes</div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl shadow-lg p-6">
            <p className="text-2xl pb-2 font-bold">Projets</p>
          <div className="flex gap-5 ">
            
            <div className="basis-1/2 flex gap-5">
            
              <div style={styles.box} className="basis-1/2 flex gap-6 shadow">
                <div className="h-full flex flex-col justify-center">
                <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ fontSize: 24, color: "white", width: 24, height: 24, backgroundColor: "rgb(141, 214, 153)", padding: "10px", border: "0px solid grey", borderRadius: "10px" }}
              />
                </div>

              <div className="flex flex-col justify-center">
                  <p className="text-nowrap">Projets terminés</p>
                  <p className="text-3xl">5</p>
                </div>
              </div>
              <div style={styles.box} className="basis-1/2 flex gap-6">
              <div className="h-full flex flex-col justify-center">
                <FontAwesomeIcon
                icon={faClock}
                style={{ fontSize: 24, color: "white", width: 24, height: 24, backgroundColor: "rgb(175, 189, 233)", padding: "10px", border: "0px solid grey", borderRadius: "10px" }}
              />
              </div>
                <div className="flex flex-col justify-center">
                  <p className="text-nowrap">Projets en cours</p>
                  <p className="text-3xl">5</p>
                </div>
              </div>
            </div>
            <div style={styles.box} className="basis-1/2 flex">
              <p className="">Projet récent</p>
              <div className="bg-slate-50 w-full m-3 h-min border border-gray-400 rounded-lg flex justify-between p-2">
                <div>projet</div>
                <button className="h-[24px]" onClick={() => {}}>
                  <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: 24, color: "grey", width: 24, height: 24}} />
                </button>
              </div>
            </div>
          </div>
          </div>
          <div className="bg-slate-50 rounded-xl shadow-lg p-6 gap-8 flex flex-wrap">
            <p className="text-2xl w-full -mb-6 font-bold">Liens utiles</p>
            <div style={styles.box} className="w-96 flex">
              <a href="https://www.github.com" target="_blank" className="basis-1/3">
                <img src="/socials/github.png"></img>
              </a>
              <div className="p-3">
                <a href="https://www.github.com" target="_blank" className="w-min font-bold text-2xl flex cursor-pointer" style={underlined("oklch(58.5% 0.233 277.117)", textHover[0])} onMouseOver={() => setTextHover([true, false, false, false, false])} onMouseLeave={() => setTextHover([false, false, false, false, false])}>GitHub</a>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
              
            </div>
            <div style={styles.box} className="w-96 flex">
              <a href="https://www.linkedin.com" target="_blank" className="basis-1/3">
                <img src="/socials/linkedin.png" ></img>
              </a>
              <div className="p-3">
                <a href="https://www.linkedin.com" target="_blank" className="w-min overflow-auto font-bold text-2xl flex cursor-pointer" style={underlined("rgb(59,	155,	237)", textHover[1])} onMouseOver={() => setTextHover([false, true, false, false, false])} onMouseLeave={() => setTextHover([false, false, false, false, false])}>Linkedin</a>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
              
            </div>
            <div style={styles.box} className="w-96 flex">
              <a href="https://www.dev.to" target="_blank" className="basis-1/3">
                <img src="/socials/dev.png"></img>
              </a>
              <div className="p-3">
                <a href="https://www.dev.to" target="_blank" className="w-min overflow-auto font-bold text-2xl cursor-pointer" style={underlined("oklch(72.3% 0.219 149.579)", textHover[2])} onMouseOver={() => setTextHover([false, false, true, false, false])} onMouseLeave={() => setTextHover([false, false, false, false, false])}>Dev</a>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
            </div>
            <div style={styles.box} className="w-96 flex">
              <a href="https://www.reddit.com" target="_blank" className="basis-1/3">
                <img src="/socials/reddit.png"></img>
              </a>
              <div className="p-3">
                <a href="https://www.reddit.com" target="_blank" className="w-min overflow-auto font-bold text-2xl flex cursor-pointer" style={underlined("oklch(70.5% 0.213 47.604)", textHover[3])} onMouseOver={() => setTextHover([false, false, false, true, false])} onMouseLeave={() => setTextHover([false, false, false, false, false])}>Reddit</a>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
            </div>
          </div>
            <button className="bg-slate-50 shadow hover:bg-slate-100 h-full rounded-lg w-32 p-2 outline-offset-2 outline-blue-400 active:outline-2 active:bg-sky-100">
              <FontAwesomeIcon className="text-slate-500" icon={faPlus} />
              
            </button>
        </div>
      </BaseLayout>
    </div>
  );
}
