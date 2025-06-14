'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('🔐 Attempting sign in with:', { email })

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      console.error('❌ Sign-in error:', error.message)
    } else {
      console.log('✅ Sign-in success! Redirecting to dashboard...')
      router.push('/dashboard')
    }
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Sign in to your account</h1>
      </div>

      <form onSubmit={handleSignIn}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="form-input w-full py-2"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="btn w-full bg-blue-600 text-white shadow-sm hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link href="/reset-password" className="text-sm text-gray-700 underline hover:no-underline">
          Forgot password?
        </Link>
        <br />
        <Link href="/signup" className="text-sm text-gray-700 underline hover:no-underline">
          Don’t have an account? Sign up
        </Link>
      </div>
    </>
  )
}
