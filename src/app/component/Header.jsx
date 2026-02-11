'use client'
import { account } from '../../lib/appwrite'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const logout = async () => {
    await account.deleteSession('current')
    router.push('/admin/login')
  }

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
      <h1 className="font-semibold text-lg">Admin Panel</h1>

      <button
        onClick={logout}
        className="bg-black text-white px-4 py-2"
      >
        Logout
      </button>
    </header>
  )
}
