'use client'

import { useEffect, useState } from 'react'
import { databases, storage } from '@/lib/appwrite'
import { ID, Query } from 'appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
const COLLECTION_ID = 'website'
const BUCKET_ID = '6986e8a4001925504f6b'

export default function NavbarCMS() {
  const [docId, setDocId] = useState(null)
  const [form, setForm] = useState({
    topBarText: '',
    phone: '',
    logoUrl: '',
    navMenus: '',
    showFranchiseBtn: true,
    showAdminBtn: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.limit(1)]
      )

      if (res.documents.length) {
        const d = res.documents[0]
        setDocId(d.$id)
        setForm({
          topBarText: d.topBarText || '',
          phone: d.phone || '',
          logoUrl: d.logoUrl || '',
          navMenus: d.navMenus || '',
          showFranchiseBtn: d.showFranchiseBtn ?? true,
          showAdminBtn: d.showAdminBtn ?? true,
        })
      }
    }

    fetchData()
  }, [])

  const uploadLogo = async (file) => {
    const uploaded = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      file
    )

    const url = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`

    setForm(prev => ({ ...prev, logoUrl: url }))
  }

  const saveNavbar = async () => {
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      docId,
      form
    )
    alert('Navbar updated ✅')
  }

  return (
    <div className="max-w-4xl space-y-4">
      <h1 className="text-2xl font-bold">Navbar CMS</h1>

      <input
        className="border p-3 w-full"
        placeholder="Top Bar Text"
        value={form.topBarText}
        onChange={e => setForm({ ...form, topBarText: e.target.value })}
      />

      <input
        className="border p-3 w-full"
        placeholder="Phone Number"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      {/* <textarea
        className="border p-3 w-full h-40"
        placeholder="Nav Menus JSON"
        value={form.navMenus}
        onChange={e => setForm({ ...form, navMenus: e.target.value })}
      /> */}

      <div>
        <label className="block font-medium mb-2">Upload Logo</label>
        <input type="file" onChange={e => uploadLogo(e.target.files[0])} />
        {form.logoUrl && <img src={form.logoUrl} className="h-14 mt-3" />}
      </div>

      <label>
        <input
          type="checkbox"
          checked={form.showFranchiseBtn}
          onChange={e =>
            setForm({ ...form, showFranchiseBtn: e.target.checked })
          }
        /> Show Franchise Login
      </label>

      <label>
        <input
          type="checkbox"
          checked={form.showAdminBtn}
          onChange={e =>
            setForm({ ...form, showAdminBtn: e.target.checked })
          }
        /> Show Admin Login
      </label>

      <button
        onClick={saveNavbar}
        className="bg-black text-white px-6 py-3"
      >
        Save Navbar
      </button>
    </div>
  )
}
