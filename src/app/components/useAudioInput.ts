"use client"
import { useEffect, useState } from "react"

export default function useAudioInput(){
    let [audioRecorder, setAudioRecorder] = useState<any>(null);
    let [transcript, setTranscript] = useState("");
    let [isRecordOn, setRecordOn] = useState(false);
    
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
        audioRecorder.stop();
        setRecordOn(false);
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
            console.log(transcript);
        }
        if(!isRecordOn){
            audioRecorder.start();
            setRecordOn(true);
        }
        
    }
    
    function getTranscript(){
        return transcript;
    }
    
    return {startRecorder, stopRecorder, isRecordOn};
}