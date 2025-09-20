'use client'

import { useState } from "react"
import { supabase } from "../../../supabase"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async() => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
            // Optional: you can pass user_metadata like username
            // options: { data: { username: 'yourUsername' } }
        })
        


    }


    return(
        <div>
          <div className="bg-amber-300">
            username<input value={email} onChange={(e) => setEmail(e.target.value)}/>
            password <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>
                Sign up 
            </button>
          </div>
        </div>
    )
}