'use client'
import { account } from '@/lib/appwrite'

export default function TestPage() {
  return (
    <div className="p-10">
      <h1>Appwrite Connected ✅</h1>
      <p>{account ? 'Account ready' : 'Error'}</p>
    </div>
  )
}
