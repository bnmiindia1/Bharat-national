'use client'

import { useState, useEffect } from 'react'
import { account, databases } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
  const checkSession = async () => {
    try {
      await account.get()
      router.replace('/admin/dashboard')
    } catch {}
  }
  checkSession()
}, [])


  const loginAdmin = async () => {
    setLoading(true)
    try {
      // 1️⃣ Login
      await account.createEmailPasswordSession(email, password)

      // 2️⃣ Get logged-in user
      const user = await account.get()

      // 3️⃣ Fetch role from users table
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        'users'
      )

      const dbUser = res.documents.find(u => u.email === user.email)

      if (dbUser?.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        alert('Access denied')
      }
    } catch (err) {
      alert(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          className="w-full border p-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={loginAdmin}
          disabled={loading}
          className="w-full bg-black text-white py-2"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}
