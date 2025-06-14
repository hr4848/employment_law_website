'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Sign In - Employment Rights Toolikt',
  description: 'Login to your account',
};

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('🔐 Signing in with:', { email, password });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log('🧾 Supabase response:', { data, error });

    if (error) {
      setError(error.message);
      console.error('❌ Sign-in error:', error.message);
    } else {
      console.log('✅ Sign-in success! Redirecting to dashboard...');
      router.push('/dashboard');
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Sign in to your account</h1>
      </div>

      <form onSubmit={handleSignIn}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
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
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
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
        </div>

        {error && <p className="text-red-600 mt-2">{error}</p>}

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
        <Link
          className="text-sm text-gray-700 underline hover:no-underline"
          href="/reset-password"
        >
          Forgot password?
        </Link>
      </div>
    </>
  );
}
