'use client'
import { useState } from 'react'
import { account, databases, ID } from '@/lib/appwrite'

export default function AdminSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!email || !password || !username) {
      alert('All fields are required')
      return
    }

    setLoading(true)
    try {
      // 1️⃣ Create Auth User
      const authUser = await account.create(
        ID.unique(),
        email,
        password
      )

      // 2️⃣ Create DB profile
    await databases.createDocument(
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  'users',
  ID.unique(),
  {
    username,
    email,
    role: 'admin'
  }
)

      alert('Admin created successfully 🎉')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Admin</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full"
      >
        {loading ? 'Creating...' : 'Create Admin'}
      </button>
    </div>
  )
}
