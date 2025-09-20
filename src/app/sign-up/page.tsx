'use client'

import '@/app/globals.css'
import { useState } from "react"
import { supabase } from "../../../supabase"

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const handleSignup = async() => {
      console.log(email)
      console.log(password)
      const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // Optional: you can pass user_metadata like username
      // options: { data: { username: 'yourUsername' } }
    })
  
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
          <div className='bg-amber-300'>
            
            email<input value={email} onChange={(e) => setEmail(e.target.value)}/>
            password <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSignup}>
                Sign up 
            </button>
          </div>
        </div>
    )
}