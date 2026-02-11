'use client'

import { useEffect, useState } from 'react'
import { databases, storage } from '@/lib/appwrite'
import { ID, Query } from 'appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
const COLLECTION_ID = 'website'
const BUCKET_ID = '6986e8a4001925504f6b'

export default function AboutCMS() {
  const [docId, setDocId] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.limit(1)]
      )

      if (res.documents.length) {
        const doc = res.documents[0]
        setDocId(doc.$id)
        setForm(doc)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const uploadImage = async (file) => {
    setUploading(true)

    try {
      const uploaded = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      )

      const fileUrl = storage.getFileView(
        BUCKET_ID,
        uploaded.$id
      )

      setForm(prev => ({ ...prev, aboutImage: fileUrl }))
    } catch (err) {
      console.error(err)
      alert('Image upload failed')
    }

    setUploading(false)
  }

  const saveAbout = async () => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        docId,
        form
      )
      alert('About updated ✅')
    } catch (err) {
      console.error(err)
      alert('Save failed')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">About CMS</h1>

      <input
        className="border p-3 w-full"
        placeholder="Main Title"
        value={form.aboutTitle || ''}
        onChange={e =>
          setForm({ ...form, aboutTitle: e.target.value })
        }
      />

      <input
        className="border p-3 w-full"
        placeholder="Highlighted Word"
        value={form.aboutSubtitleHighlight || ''}
        onChange={e =>
          setForm({ ...form, aboutSubtitleHighlight: e.target.value })
        }
      />

      <textarea
        className="border p-3 w-full"
        placeholder="Description"
        value={form.aboutDescription || ''}
        onChange={e =>
          setForm({ ...form, aboutDescription: e.target.value })
        }
      />

      {/* Image Upload */}
      <input
        type="file"
        onChange={(e) => uploadImage(e.target.files[0])}
      />

      {form.aboutImage && (
        <img
          src={form.aboutImage}
          className="w-64 mt-3"
        />
      )}

      {/* Accordion Fields */}
      <h2 className="font-bold mt-6">Accordion Sections</h2>

      <input
        className="border p-3 w-full"
        placeholder="Mission Title"
        value={form.missionTitle || ''}
        onChange={e =>
          setForm({ ...form, missionTitle: e.target.value })
        }
      />

      <textarea
        className="border p-3 w-full"
        placeholder="Mission Content"
        value={form.missionContent || ''}
        onChange={e =>
          setForm({ ...form, missionContent: e.target.value })
        }
      />

      <input
        className="border p-3 w-full"
        placeholder="Vision Title"
        value={form.visionTitle || ''}
        onChange={e =>
          setForm({ ...form, visionTitle: e.target.value })
        }
      />

      <textarea
        className="border p-3 w-full"
        placeholder="Vision Content"
        value={form.visionContent || ''}
        onChange={e =>
          setForm({ ...form, visionContent: e.target.value })
        }
      />

      <input
        className="border p-3 w-full"
        placeholder="Objective Title"
        value={form.objectiveTitle || ''}
        onChange={e =>
          setForm({ ...form, objectiveTitle: e.target.value })
        }
      />

      <textarea
        className="border p-3 w-full"
        placeholder="Objective Content"
        value={form.objectiveContent || ''}
        onChange={e =>
          setForm({ ...form, objectiveContent: e.target.value })
        }
      />

      <button
        onClick={saveAbout}
        className="bg-black text-white px-6 py-3"
      >
        Save About
      </button>
    </div>
  )
}
