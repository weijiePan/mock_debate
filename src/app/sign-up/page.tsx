'use client'

import '@/app/globals.css'
import { useState } from "react"
import { supabase } from "../../../supabase"
import { useRouter } from 'next/navigation'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
    const handleSignup = async() => {
      console.log(email)
      console.log(password)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // Optional: you can pass user_metadata like username
        // options: { data: { username: 'yourUsername' } }
      })
      if (data) {
        router.push('/debate')
      }
  
    console.log("hello")
    if (error) {console.log("there was an error"); return}
    console.log(data)
    const user = data.user

    if (user) {
      const { data: insertData, error: insertError } = await supabase
        .from('user_sessions')
        .insert([
          { 
            user_id: user.id,
            email: email
          } // store UID + custom username
        ])

      if (insertError) {
        console.error('Profile insert error:', insertError.message)
      } else {
        console.log('Profile created for user:', user.id)
      }
    }
    }


    return(
        <div>
          <h1 className='text-2xl flex !mt-10 justify-center'>Sign up</h1>

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
              <button onClick={() => handleSignup()} className='w-40 bg-green-500 rounded-xl h-8 cursor-pointer'>
                Sign up
              </button>
            </div>
          </div>
          <div className='h-40'>

          </div>
        </div>
    )
}