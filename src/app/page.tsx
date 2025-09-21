'use client'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],     // required
  weight: ['400','700'],  // optional: specify weights
})

import { useRouter } from 'next/navigation'

export default function Alternative() {

  const router = useRouter()

    return(
      <div className="min-h-screen bg-white overflow-auto">
        <div className="w-full h-1/8 flex justify-center">
          <div className="!mt-5 flex items-center !space-x-3">
            <img src="icon.PNG" className="w-12"></img>
            <span className={`${playfair.className} text-black text-3xl`}>Suits</span>
          </div>
        </div>

        <div className="flex justify-center !mt-10">
          <span className={`${playfair.className} text-black text-5xl`}>Train your debate skills at home.</span>
        </div>

        <div className='!mt-10 flex justify-center items-center !space-x-5'>
          

          <button onClick={() => router.push('/main')} className='border-2 w-50 h-16 border-black rounded-full bg-black hover:scale-110 transition cursor-pointer'>
            <span className={`${playfair.className} text-2xl text-white`}>New chat</span>
          </button>

          <button onClick={() => document.getElementById("target")?.scrollIntoView()} className='border-2 w-40 h-12 border-black rounded-full bg-white hover:scale-110 transition cursor-pointer'>
            <span className={`${playfair.className} text-xl text-black`}>About</span>
          </button>
        </div>

        <div className='flex justify-center !mt-10'>
          <div className='w-200 h-120'>
            <img src="/argument.jpeg" className='border-2 border-black rounded-xl' />
          </div>
        </div>


        <div className='!mt-20 flex justify-center'>
          <span className={`${playfair.className} text-black text-4xl`}>How to play:</span>
        </div>

        <div id="target" className='!mt-5 flex justify-center'>
          <div className='w-4/5 flex items-center'>
            <img />
            <span className={`${playfair.className} text-black text-xl `}>
              1. First, pick a topic to debate about.
            </span>
          </div>
        </div>

        <div className='!mt-5 flex justify-center'>
          <div className='w-4/5  flex items-center'>
            
            <span className={`${playfair.className} text-black text-xl`}>
              2. Then, the AI will find relevant historical court cases and arguments to try and win against you.
            </span>

            <img />
          </div>
        </div>

        <div className='!mt-5 flex justify-center'>
          <div className='w-4/5  flex items-center'>
            <img />

            <span className={`${playfair.className} text-black text-xl !ml-auto`}>
              3. Finally, the judge will rate your perfomance in live time and show you the weaknesses of your argument.
            </span>

            
          </div>
        </div>

        <div className='!mt-40'>

        </div>
      </div>
    )
}