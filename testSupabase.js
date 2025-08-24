import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://amfjjsshokjiitqvwjjc.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZmpqc3Nob2tqaWl0cXZ3ampjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk4MTUsImV4cCI6MjA2NzMyNTgxNX0.PfC8FESdxZaVW6ShBxX3cIyM5t4G6VEFIWqI55upoKs'

const supabase = createClient(supabaseUrl, supabaseKey)

async function test2() {
  console.log('before signup call...')
  const { data, error } = await supabase.auth.signUp({
    email: 'alameleromeo3@gmail.com',
    password: 'deepshit',
  })
  console.log('after signup call...')

  console.log('data: ', data)
  console.log('error: ', error)
}

async function test() {
  console.log('before signin...')
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'alameleromeo3@gmail.com',
    password: 'deepshit',
  })
  console.log('after signin...')

  console.log('data: ', data)
  console.log('error: ', error)
}

test2()
setTimeout(test, 3000)
