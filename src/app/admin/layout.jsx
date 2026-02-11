'use client'

import { useEffect, useState } from 'react'
import { account, databases } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import { Query } from 'appwrite'
import AdminSidebar from '../../../component/admin/AdminSidebar'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
const USERS_COLLECTION = 'users'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const verifyAdmin = async () => {
      try {
        // 1️⃣ Check logged-in user
        const authUser = await account.get()

        // 2️⃣ Find user in DB
        const res = await databases.listDocuments(
          DATABASE_ID,
          USERS_COLLECTION,
          [Query.equal('email', authUser.email)]
        )

        if (!res.documents.length) {
          router.replace('/admin/login')
          return
        }

        const dbUser = res.documents[0]

        // 3️⃣ Role check
        if (dbUser.role !== 'admin') {
          router.replace('/admin/login')
          return
        }

        // ✅ Admin verified
        if (mounted) setLoading(false)

      } catch (error) {
        console.error('Admin auth failed:', error)
        router.replace('/admin/login')
      }
    }

    verifyAdmin()

    return () => {
      mounted = false
    }
  }, [router])

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Checking admin access…</p>
      </div>
    )
  }

  // ✅ Admin UI
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  )
}
