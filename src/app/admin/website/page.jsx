'use client'

import { useEffect, useState } from 'react'
import { databases } from '../../../lib/appwrite'
import { ID, Query } from 'appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
const COLLECTION_ID = 'website'

export default function WebsiteSettingsPage() {
  const [docId, setDocId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    siteName: '',
    heroTitle: '',
    heroSubtitle: '',
    footerText: '',
    contactEmail: '',
  })

  // 🔹 Fetch or create website settings
  useEffect(() => {
    const initSettings = async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.limit(1)]
        )

        // ✅ If document exists
        if (res.documents.length > 0) {
          const doc = res.documents[0]
          setDocId(doc.$id)

          setForm({
            siteName: doc.siteName || '',
            heroTitle: doc.heroTitle || '',
            heroSubtitle: doc.heroSubtitle || '',
            footerText: doc.footerText || '',
            contactEmail: doc.contactEmail || '',
          })
        } 
        // 🆕 If no document → create one
        else {
          const newDoc = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
              siteName: '',
              heroTitle: '',
              heroSubtitle: '',
              footerText: '',
              contactEmail: '',
            }
          )

          setDocId(newDoc.$id)
          setForm({
            siteName: '',
            heroTitle: '',
            heroSubtitle: '',
            footerText: '',
            contactEmail: '',
          })
        }
      } catch (err) {
        console.error('Website init failed:', err)
      } finally {
        setLoading(false)
      }
    }

    initSettings()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const saveSettings = async () => {
    if (!docId) {
      alert('Website document not ready yet')
      return
    }

    setSaving(true)
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        docId,
        form
      )
      alert('Website settings saved ✅')
    } catch (err) {
      console.error('Save failed:', err)
      alert('Save failed — check console')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="p-10">Loading website settings...</p>

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Website Settings</h1>

      {Object.entries({
        siteName: 'Site Name',
        heroTitle: 'Hero Title',
        heroSubtitle: 'Hero Subtitle',
        footerText: 'Footer Text',
        contactEmail: 'Contact Email',
      }).map(([key, label]) => (
        <div key={key} className="mb-4">
          <label className="block font-medium mb-1">{label}</label>
          <input
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full border px-4 py-2"
          />
        </div>
      ))}

      <button
        onClick={saveSettings}
        disabled={saving}
        className="mt-4 bg-black text-white px-6 py-2"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
