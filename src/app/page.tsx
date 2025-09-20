import Image from "next/image";
import styles from "./page.module.css";
import AudioInput from "./components/AudioInput";
export default function Home() {
  return (
    <div>
      <p className="bg-amber-900 text-5xl">hello</p>
      <AudioInput></AudioInput>
    </div>
    
  );
}
