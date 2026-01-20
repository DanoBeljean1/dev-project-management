'use client'

import Image from "next/image";
import BaseLayout from "./main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";



export default function Home() {

  const styles = {
    box: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "10px",
      border: "1px solid rgb(177, 187, 196)"
    }
  }

  return (

    <div>
      

      <BaseLayout>
      
        <div className="">
          <div className="flex p-8 gap-8">
            
            <div style={styles.box} className="basis-1/3">Tracker d'activités</div>
            <div style={styles.box} className="basis-2/3">Activités récentes</div>
          </div>
          <div style={styles.box} className="m-8 flex gap-5">
            
            <div className="basis-1/2 flex gap-10">
            
              <div className="basis-1/2 flex justify-center gap-6">
                <div className="h-full flex flex-col justify-center">
                <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ fontSize: 48, color: "white", width: 48, height: 48, backgroundColor: "rgb(91, 175, 105)", padding: "10px", border: "0px solid grey", borderRadius: "10px" }}
              />
                </div>
            


                <div className="flex flex-col justify-center">
                  <p>Projets terminés</p>
                  <p className="text-4xl flex justify-center">5</p>
                </div>
              </div>
              <div className="basis-1/2 flex justify-center gap-6">
              <div className="h-full flex flex-col justify-center">
                <FontAwesomeIcon
                icon={faClock}
                style={{ fontSize: 48, color: "white", width: 48, height: 48, backgroundColor: "rgb(175, 189, 233)", padding: "10px", border: "0px solid grey", borderRadius: "10px" }}
              />
              </div>
                <div className="flex flex-col justify-center">
                  <p>Projets en cours</p>
                  <p className="text-4xl flex justify-center">5</p>
                </div>
              </div>
            </div>
            <div className="basis-1/2 flex">
              <p className="">Projet récent</p>
              <div className="bg-slate-200 w-full m-3 border border-gray-400 rounded-lg flex justify-between p-2">
                <div>projet</div>
                <button onClick={() => {}}>
                  <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: 24, color: "grey", width: 24, height: 24}} />
                </button>
              </div>
            </div>
          </div>
          <div className="p-8 gap-8 flex flex-wrap">
            <div style={styles.box} className="w-64 h-48">
              <a href="https://www.github.com" target="_blank" className="w-full h-28 flex justify-center">
                <img src="/socials/github.png"></img>
              </a>
              <p className="p-3 overflow-auto">GitHub</p>
            </div>
            <div style={styles.box} className="w-64 h-48">
              <a href="https://www.linkedin.com" target="_blank" className="w-full h-28 flex justify-center">
                <img src="/socials/linkedin.png" ></img>
              </a>
              <p className="p-3 overflow-auto">Linkedin</p>
            </div>
            <div style={styles.box} className="w-64 h-48">
              <a href="https://www.dev.to" target="_blank" className="w-full h-28 flex justify-center">
                <img src="/socials/dev.png"></img>
              </a>
              <p className="p-3 overflow-auto">Dev</p>
            </div>
            <div style={styles.box} className="w-64 h-48">
              <a href="https://www.reddit.com" target="_blank" className="w-full h-28 flex justify-center">
                <img src="/socials/reddit.png"></img>
              </a>
              <p className="p-3 overflow-auto">Reddit</p>
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
    /*
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.js file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>*/
  );
}
