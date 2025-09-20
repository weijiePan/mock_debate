'use client'
import {use, useState} from "react";
import Textbox from "../components/Textbox";

export default function debate(){
    let [userInput, changeUserInput]:[string[], Function] = useState([]); 
    let [aiOutput, changeAiOutput]:[string[], Function] = useState([]); 
    return<>
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
}