'use client'

import Image from "next/image";
import BaseLayout from "./main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock, faPlus} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";



export default function Home() {

  const styles = {
    box: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "10px",
      boxShadow: "1px 1px 6px #00000041"
    }
  }

  return (

    <div>
      

      <BaseLayout>
      
      <div className="p-10 pb-0 text-[64px] text-[#4e6e79] font-semibold flex"><p className="underline decoration-teal-500 decoration-5">Welcom</p>e back</div>
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
                <p className="font-bold text-2xl flex"><p className="underline decoration-indigo-500 decoration-2">Git</p>Hub</p>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
              
            </div>
            <div style={styles.box} className="w-96 flex">
              <a href="https://www.linkedin.com" target="_blank" className="basis-1/3">
                <img src="/socials/linkedin.png" ></img>
              </a>
              <div className="p-3">
                <p className="overflow-auto font-bold text-2xl flex"><p className="underline decoration-sky-500 decoration-2">Link</p>edin</p>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
              
            </div>
            <div style={styles.box} className="w-96 flex">
              <a href="https://www.dev.to" target="_blank" className="basis-1/3">
                <img src="/socials/dev.png"></img>
              </a>
              <div className="p-3">
                <p className="overflow-auto font-bold text-2xl"><p className="underline decoration-pink-500 decoration-2">Dev</p></p>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
            </div>
            <div style={styles.box} className="w-96 flex">
              <a href="https://www.reddit.com" target="_blank" className="basis-1/3">
                <img src="/socials/reddit.png"></img>
              </a>
              <div className="p-3">
                <p className="overflow-auto font-bold text-2xl flex"><p className="underline decoration-green-500 decoration-2">Redd</p>it</p>
                <p className="text-lg leading-none pt-2 text-slate-600">Gestion des projets et codes sources</p>
              </div>
            </div>
          </div>
          <div style={styles.box} className="w-32 justify-center flex">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      </BaseLayout>
    </div>
  );
}
