"use client"
import { useEffect, useState } from "react"

export default function useAudioInput(){
    let [audioRecorder, setAudioRecorder] = useState<any>(null);
    let [transcript, setTranscript] = useState("");
    
    useEffect(() => {
        // Initialize speech recognition only in browser
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            if (SpeechRecognition) {
                setAudioRecorder(new SpeechRecognition());
            }
        }
    }, []);
    
    function stopRecorder(){
        const text = transcript;
        console.log(text);
        audioRecorder.stop();
        return text;
    }
    
    function startRecorder(){
        if (!audioRecorder) {
            console.error('Speech recognition not available');
            return;
        }
        
        audioRecorder.onresult = (event: any) => {
            setTranscript(event.results[0][0].transcript);
        };
        audioRecorder.onend =(e:any)=>{
            console.log("ended");
        }
        audioRecorder.start();
    }
    
    function getTranscript(){
        return transcript;
    }
    
    return {startRecorder, stopRecorder};
}