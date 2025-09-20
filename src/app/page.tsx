"use client"
import Image from "next/image";
import styles from "./page.module.css";
import useAudioInput from "./components/useAudioInput";
export default function Home() {
  const {startRecorder, stopRecorder} = useAudioInput();
  
  return (
    <div>
      <button onClick={()=>{
        startRecorder();
      }}>start</button>
      <button onClick={()=>{
        console.log(stopRecorder());
      }}>stop</button>
      
    </div>
    
  );
}
