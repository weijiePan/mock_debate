'use client'
import {use, useState} from "react";
import Textbox from "../components/Textbox";
import { supabase } from "../../../supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {X, Mic} from 'lucide-react';
import {motion} from 'framer-motion'
import { getRebuttal, getRating } from "./aiMessageUtil";
import { b } from "framer-motion/client";
import useAudioInput from "../components/useAudioInput";


export default function debate(){
  let [userInput, changeUserInput]:[string, Function] = useState(""); 
  let [opponentOutput, changeOpponentOutput]:[string, Function] = useState(""); 
  let [judgeOutput, changeJudgeOutput]:[string, Function] = useState("");

  let{startRecorder, stopRecorder} = useAudioInput();
    
  let [userHistory, changeUserHistory]:[string[], Function] = useState([]); 
  let [opponentHistory, changeOpponentHistory]:[string[], Function] = useState([]); 
  let [judgeHistory, changeJudgeHistory]:[any[], Function] = useState([]);
  const router = useRouter();

  const [userId, setUserId] = useState('')
  const [history, setHistory] = useState(false)
  
  const [current, setCurrent] = useState('yourself')
  const [left, setLeft] = useState("judge")
  const [right, setRight] = useState("opponent")

  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [typingIndex, setTypingIndex] = useState(0); // char index in the current message

   useEffect(() => {
    console.log("using effect")
    if (opponentHistory.length === 0) return;

    const currentMessage = opponentHistory[opponentHistory.length - 1];

    // if we already displayed all messages, start typing the latest
    if (displayedTexts.length < opponentHistory.length) {
      const interval = setInterval(() => {
        setTypingIndex((prev) => {
          if (prev < currentMessage.length) return prev + 1;

          // finished typing: push full message to displayedTexts
          clearInterval(interval);
          setDisplayedTexts(opponentHistory);
          console.log(opponentHistory)
          return prev;
        });
      }, 40); // typing speed (ms per character)

      return () => clearInterval(interval);
    }
  }, [opponentHistory, displayedTexts]);

   const fullyTyped = displayedTexts.slice(0, -2);
   const currentMsg = opponentHistory[displayedTexts.length - 1] || "";
   const typingMessage = current.slice(0, typingIndex);

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

  function reverseArray(arr: string[]) {
    const result: string[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
  }

  const array = ['hello', 'this is an important message', 'hello again', 'fjdisjijdsniufjhuid hfos jdaiofjjfjodhsijfhdsuijfhdsuifhdsui hujdfhujhdfjdhfjhdsjfhdsjfhudishnfujdsn h ujfhdufhdsuhfjdsfhkdshfjdsknbfdjsnfdjsbn ufhdsufhdsjnfkdsnfjkdsn fknds fkdsbfijndsijfbndsjibf jdks fkdsnf kjhsd fhsjdkhf', 'hfjdsnjfhdsjuahfnjdskafjudshfudsh uifhuid shfijdsjfhdsijfhdsjfdnsfkm nsdjf ndsjnfdjshf sjhn', 'f hfudjshfjudshfukdshfusdhfi bsdnjf ndsjubf sdujbfju dsbfj dsfkshjufhß', 'fds', "new one"]
  const reversed = reverseArray(array)
  const renderCurrent = () => {
    switch (current) {
      case "yourself":
        return (
          <div>
            <div className="flex justify-center !mt-5">
              <span className="text-3xl text-black">Your argument</span>
            </div>

            <div className="h-140 !p-2 !px-6 !mt-3 !space-y-2 overflow-y-auto ">
              {

                userHistory.map(text =>
                  <div
                  className="max-w-[100%] bg-blue-500 text-white !px-4 !py-2 rounded-2xl shadow-md"
                  >
                  <span>{text}</span>
                  </div>
                )
              }
             
            </div>
            
            <div className="flex flex-col justify-end ">

              <div className="mb-5 !pt-4 flex justify-center items-center">
                <div className="w-12 h-12 border-2 border-black rounded-full !mr-2 flex justify-center items-center cursor-pointer">
                  <Mic className="text-black"/>
                </div>
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
                
                
              </div>
              
            </div>
          </div>
        )
      case "judge":
        return (
          <div>
            <div className="flex justify-center !mt-5">
              <span className="text-3xl text-black">Judge</span>
          
            </div>
            <div>
              <div className="h-140 !p-2 !px-6 !mt-3 !space-y-2 overflow-y-auto ">
                {
                  judgeHistory.map(obj=>
                    <div>
                      <div className="max-w-[100%] bg-blue-500 text-white !px-4 !py-2 rounded-2xl shadow-md">
                        <div>
                          <span className={
                            obj.rhetoric.score >= 7 
                            ? "text-green-500"
                            : obj.rhetoric.score >= 5
                            ? "text-yellow-500"
                            : "text-red-500"
                          }
                          >rhetoric: {obj.rhetoric.score}</span> <br />
                          <span className="text-white">{`Explanation: ${obj.rhetoric.reasoning}`}</span>
                        </div>
                        <div>
                          <span className={
                            obj.logic.score >= 7 
                            ? "text-green-500"
                            : obj.logic.score >= 5
                            ? "text-yellow-500"
                            : "text-red-500"
                          }
                          >logic: {obj.logic.score}</span> <br />
                          <span className="text-white">{`Explanation: ${obj.logic.reasoning}`}</span>
                        </div>
                        <div>
                          <span className={
                            obj.accuracy.score >= 7 
                            ? "text-green-500"
                            : obj.accuracy.score >= 5
                            ? "text-yellow-500"
                            : "text-red-500"
                          }
                          >accuracy: {obj.accuracy.score}</span> <br />
                          <span className="text-white">{`Explanation: ${obj.accuracy.reasoning}`}</span>
                        </div>
                      </div>
                    </div>
                    

                  )
                }
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
            <div className="">
              <img src="CharacterSprite.PNG" className="!translate-x-2"/>
            </div>
            <div className="h-70 !p-2 !px-6 !space-y-2 overflow-y-auto">
                {fullyTyped.map((text, idx) => (
                    <div
                    key={idx}
                    className="max-w-[100%] bg-blue-500 text-white !px-4 !py-2 rounded-2xl shadow-md"
                    >
                    <span>{text}</span>
                    </div>
                ))}

                {/* Currently typing bubble */}
                {typingMessage && (
                    <div className="max-w-[100%] bg-blue-500 text-white !px-4 !py-2 rounded-2xl shadow-md">
                    <span>{typingMessage}</span>
                    <span className="animate-pulse">▍</span> {/* blinking cursor */}
                    </div>
                )}
                </div>
          </div>
        )
      default:
        return <></>
    }
  }
    
  return(

    

    <div className="min-h-screen bg-white">


      <div>

        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="w-120 h-180 rounded-xl border-4 border-black bg-white transition">
            {renderCurrent()}
          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !ml-100 z-5 pointer-events-none">
          <div className="w-90 h-120 rounded-xl bg-gray-200 border-4 border-black pointer-events-auto">

          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !ml-175 z-30 pointer-events-none">
          <div onClick={clickRight} className="w-0 h-0 hover:translate-x-2 duration-200 transition-transform pointer-events-auto
            border-t-[20px] border-t-transparent
            border-b-[20px] border-b-transparent
            border-l-[30px] border-l-blue-500"> 


          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !mr-100 z-5 pointer-events-none">
          <div className="w-90 h-120 rounded-xl bg-gray-200 border-4 border-black pointer-events-auto">

          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center !mr-175 z-30 pointer-events-none">
          <div onClick={clickLeft} className="w-0 h-0 hover:-translate-x-2 duration-200 transition-transform pointer-events-auto
            border-t-[20px] border-t-transparent
            border-b-[20px] border-b-transparent
            border-r-[30px] border-r-blue-500"> 


          </div>
        </div>


      </div>
    </div>
  )
}