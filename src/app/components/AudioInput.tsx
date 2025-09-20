"use client"

export default function AudioInput(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                setRecognition(new SpeechRecognition());
            }
}