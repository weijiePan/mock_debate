'use client'

import { useState } from "react"
import { supabase } from "../../../supabase"
import { useRouter } from "next/navigation"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    
    const handleLogin = async() => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
            // Optional: you can pass user_metadata like username
            // options: { data: { username: 'yourUsername' } }
        })
        if (data) {
          router.push('/debate')
        }
        


    }


    return(
        <div>
          <h1 className='text-2xl flex !mt-10 justify-center'>Log in</h1>

          <div className='!mt-40 h-65 !p-5 w-1/5 !mx-auto !shadow-xl !space-y-4 rounded-2xl'>
            <div className=''>
              <span className='text-xl'>Email: <br /></span>
              <input 
              className='border-1 rounded-lg w-full h-8 !p-2'
              />
            </div>

            <div className=''>
              <span className='text-xl'>Password: <br /></span>
              <input 
              className='border-1 rounded-lg w-full h-8 !p-2'
              />
            </div>

            <div className='!mt-10 flex justify-center'>
              <button onClick={() => handleLogin()} className='w-40 bg-green-500 rounded-xl h-8 cursor-pointer'>
                Log in
              </button>
            </div>
          </div>
          <div className='h-40'>

          </div>
        </div>
    )
}