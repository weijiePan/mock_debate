'use client'
import {use, useState} from "react";
import Textbox from "../components/Textbox";
import { supabase } from "../../../supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {X} from 'lucide-react';

export default function debate(){
  let [userInput, changeUserInput]:[string[], Function] = useState([]); 
  let [aiOutput, changeAiOutput]:[string[], Function] = useState([]); 
    
  const router = useRouter();

  const [userId, setUserId] = useState('')
  const [history, setHistory] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
        router.push("/login");
        return;
        }
        setUserId(session.user.id);
    };

    checkUser();
  }, [router]);
    
    
    
    
    
    return(<>

        <div className="">



          <div className="w-full h-screen bg-[#2B2B2B]">

            <div className="h-1/10 text-white text-2xl !p-4 flex">
              <div className="text-white">
                law school app
              </div>
            
              <div className="block !ml-14">
                <button onClick={() => setHistory(true)} className="bg-[#D9D9D9] rounded-full w-30 hover:opacity-70 transition !absolute !right-10">
                    <span className="text-[#2B2B2B] text-lg">History</span>
                </button>
              </div>
            
            </div>

            <div className="h-8/10">

            </div>

            <div className="flex justify-center items-center ">
              
              <div className="!mr-2 w-12 h-12 rounded-full bg-[#2B2B2B] border-2 border-[#FFFFFF] text-white text-center font-bold flex justify-center items-center !ml-2 hover:opacity-70 transition cursor-pointer">
                mic
              </div>

              <div className="">
                <input 
                className="bg-[#2B2B2B] border-2 border-[#FFFFFF] rounded-full w-100 h-12 text-white !p-5"
                
                />

                

              </div>
              <div className="w-12 h-12 rounded-full bg-[#2B2B2B] border-2 border-[#FFFFFF] text-white text-center font-bold flex justify-center items-center !ml-2 hover:opacity-70 transition cursor-pointer">
                <span className="text-2xl -translate-y-0.5">→</span>
              </div>
              
              {history && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="relative w-[400px] h-[300px] rounded-2xl bg-white p-6">
                        <button
                        onClick={() => setHistory(false)} // your close function
                        className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200"
                        >
                        <X className="w-5 h-5" />
                        </button>

                        <div className="mt-8">
                        history stuff
                        </div>
                    </div>
                    </div>
                )}
              
            </div>
          </div>
        </div>


{
        /*

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
<<<<<<< HEAD
        <Textbox text="Your new text here"></Textbox>
        
=======
        <Textbox text=""></Textbox>
        */
}
>>>>>>> refs/remotes/origin/master
    </>
    )
}