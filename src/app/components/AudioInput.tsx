"use client"
import { useEffect, useState } from "react"

export default function AudioInput(){
    let [audioRecorder, setAudioRecorder] = useState(new (window as any).webkitSpeechRecognition());
    let [transcript, setTranscript] = useState("");
    
    useEffect(()=>{
        audioRecorder.onresult = (event: any) => {
            setTranscript(event.results[0][0].transcript);
        };
        audioRecorder.start();
        
    },[])
    return(<button onClick={
        ()=>{
            console.log(transcript);
           
        }
    }>stop</button>)
}