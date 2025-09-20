import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(
  "https://ffkpcnnlxegsneumjskh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZma3Bjbm5seGVnc25ldW1qc2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMzk4MDQsImV4cCI6MjA3MzkxNTgwNH0.eTGth8QF40Dc_gMUEirPFZpczB4M_qgDtq6YtVKJetU"
)