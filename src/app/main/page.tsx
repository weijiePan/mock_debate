'use client'
import {use, useState} from "react";
import Textbox from "../components/Textbox";
import { supabase } from "../../../supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {X, Mic} from 'lucide-react';
import {motion} from 'framer-motion'
import { getRebuttal, getRating } from "./aiMessageUtil";

export default function debate(){
  let [userInput, changeUserInput]:[string, Function] = useState(""); 
  let [opponentOutput, changeOpponentOutput]:[string, Function] = useState(""); 
  let [judgeOutput, changeJudgeOutput]:[string, Function] = useState("");
    
  let [userHistory, changeUserHistory]:[string[], Function] = useState([]); 
  let [opponentHistory, changeOpponentHistory]:[string[], Function] = useState([]); 
  let [judgeHistory, changeJudgeHistory]:[any[], Function] = useState([]);
  const router = useRouter();

  const [userId, setUserId] = useState('')
  const [history, setHistory] = useState(false)
  
  const [current, setCurrent] = useState('yourself')
  const [left, setLeft] = useState("judge")
  const [right, setRight] = useState("opponent")
   
  const clickRight = () => {
    if (current == 'yourself') {
      setCurrent('opponent')
    }
    if (current == 'opponent') {
      setCurrent('judge')
    }
    if (current == "judge") {
      setCurrent('yourself')
    }
  }

  const clickLeft = () => {
    if (current == 'yourself') {
      setCurrent('judge')
    }
    if (current == 'opponent') {
      setCurrent('yourself')
    }
    if (current == "judge") {
      setCurrent('opponent')
    }
  }

  const renderCurrent = () => {
    switch (current) {
      case "yourself":
        return (
          <div>
            <div className="flex justify-center !mt-5">
              <span className="text-3xl text-black">Yourself</span>
            </div>


            <div className="flex flex-col justify-end ">
              <div className = "userHistory">
               {userHistory.map(text => <p>{text}</p>)}
              </div>

              <div className="mb-5 flex justify-center">
                <div className="w-12 h-12 border-2 border-black rounded-full !mr-2 flex justify-center items-center cursor-pointer">
                  <Mic className="text-black"/>
                </div>
                <form>
                  <input 
                placeholder="Your argument here..."
                className="border-2 border-black w-60 h-12 rounded-full !p-4 text-gray-800"
                onChange={(e)=>{changeUserInput([e.target.value])}}
                />
                
                <div className="w-12 h-12 border-2 border-black rounded-full !ml-2 flex justify-center items-center cursor-pointer">
                  <span className="-translate-y-0.5 text-xl text-black"
                  onClick={(e)=>{
                      
                      console.log("starting");
                      console.log(userHistory);
                      changeUserHistory([...userHistory, userInput]);
                      getRebuttal(userInput[userInput.length-1]).then((text)=>{changeOpponentHistory([...opponentHistory, text])});
                      getRating(userInput[userInput.length-1]).then((obj)=>{changeJudgeHistory([...judgeHistory, obj])});
                    }
                
                }
                    
                  >→</span>
                </div>
                
                </form>
                
              </div>
              
            </div>
          </div>
        )
      case "judge":
        return (
          <div>
            <div className="flex justify-center !mt-5">
              <span className="text-3xl text-black">Judge</span>
              <span className="text-3xl">Judge</span>
              <div className = "judgeHistory">
                {opponentHistory.map((name,value)=>
                  <div>
                    <p>{name}</p>
                    <p>{value}</p>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        )
      case "opponent":
        return (
          <div>
            <div className="flex justify-center !mt-5">
              <span className="text-3xl text-black">Opponent</span>
            </div>
            <div className = "opponentHistory">
               {opponentHistory.map(text=><p>{text}</p>)}
               
              </div>
          </div>
        )
      default:
        return <></>
    }
  }
    
  return(

    

    <div className="min-h-screen bg-white">
      
      <div className="absolute top-5 right-5">
        <button className="bg-black w-20 h-8 text-white rounded-xl">
          History
        </button>
      </div>


      <div>

        <div className="fixed inset-0 flex items-center justify-center z-1">
          <div className="w-120 h-180 rounded-xl border-4 border-black bg-white transition">
            {renderCurrent()}
          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !ml-100">
          <div className="w-90 h-120 rounded-xl bg-gray-200 border-4 border-black">

          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !ml-175 z-10">
          <div onClick={clickRight} className="w-0 h-0 hover:translate-x-2 duration-200 transition-transform
            border-t-[20px] border-t-transparent
            border-b-[20px] border-b-transparent
            border-l-[30px] border-l-blue-500"> 


          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !mr-100">
          <div className="w-90 h-120 rounded-xl bg-gray-200 border-4 border-black">

          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !mr-175 z-10">
          <div onClick={clickLeft} className="w-0 h-0 hover:-translate-x-2 duration-200 transition-transform
            border-t-[20px] border-t-transparent
            border-b-[20px] border-b-transparent
            border-r-[30px] border-r-blue-500"> 


          </div>
        </div>

        <div className="absolute top-15 right-5 !mx-auto">
          <button className="bg-green-500 rounded-full w-32 h-10">
            New debate
          </button>
        </div>

      </div>
    </div>
  )
}