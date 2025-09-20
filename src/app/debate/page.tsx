'use client'
import {use, useState} from "react";
import Textbox from "../components/Textbox";

export default function debate(){
    let [userInput, changeUserInput]:[string[], Function] = useState([]); 
    let [aiOutput, changeAiOutput]:[string[], Function] = useState([]); 
    return(<>

        <div className="bg-red-500 text-white p-10 text-4xl">
            Tailwind Test
        </div>





        <form>
            <input onChange={
                (e)=>{
                    changeUserInput([...userInput, e.target.value]);
                }
            }></input>
            <button onClick={(e)=>{
                e.preventDefault();
                //calls function with the input
            }}>submit</button>
            
        </form>
        <Textbox text=""></Textbox>
        
    </>
    )
}