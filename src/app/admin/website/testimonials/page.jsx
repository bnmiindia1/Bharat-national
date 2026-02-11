"use client"

import { useEffect, useState } from 'react'
import { databases, storage } from '@/lib/appwrite'
import { ID, Query } from 'appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
const COLLECTION_ID = 'testimonials'
const BUCKET_ID = '6986e8a4001925504f6b'

export default function TestimonialsCMS() {
  const [testimonials, setTestimonials] = useState([])
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    text: '',
    imageUrl: null, // 🔥 IMPORTANT: use null not ""
  })

  const fetchTestimonials = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderAsc('order')]
      )
      setTestimonials(res.documents)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const uploadImage = async (file) => {
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

      setNewTestimonial(prev => ({
        ...prev,
        imageUrl: fileUrl,
      }))
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    }
  }

  const addTestimonial = async () => {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          name: newTestimonial.name,
          role: newTestimonial.role,
          text: newTestimonial.text,
          imageUrl: newTestimonial.imageUrl || null, // 🔥 safe
          order: testimonials.length + 1,
        }
      )

      setNewTestimonial({
        name: '',
        role: '',
        text: '',
        imageUrl: null,
      })

      fetchTestimonials()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTestimonial = async (id) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      )
      fetchTestimonials()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold">Testimonials CMS</h1>

      {/* ADD NEW */}
      <div className="space-y-4 border p-6">
        <input
          className="border p-3 w-full"
          placeholder="Name"
          value={newTestimonial.name}
          onChange={e =>
            setNewTestimonial({
              ...newTestimonial,
              name: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="Role"
          value={newTestimonial.role}
          onChange={e =>
            setNewTestimonial({
              ...newTestimonial,
              role: e.target.value,
            })
          }
        />

        <textarea
          className="border p-3 w-full"
          placeholder="Testimonial Text"
          value={newTestimonial.text}
          onChange={e =>
            setNewTestimonial({
              ...newTestimonial,
              text: e.target.value,
            })
          }
        />

        <input
          type="file"
          onChange={e => uploadImage(e.target.files[0])}
        />

        {/* PREVIEW SAFE */}
        {newTestimonial.imageUrl && (
          <img
            src={newTestimonial.imageUrl}
            alt="preview"
            className="w-20 h-20 object-cover rounded"
          />
        )}

        <button
          onClick={addTestimonial}
          className="bg-black text-white px-6 py-2"
        >
          Add Testimonial
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {testimonials.map(t => (
          <div
            key={t.$id}
            className="border p-4 flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              {/* SAFE IMAGE RENDER */}
              {t.imageUrl && (
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}

              <div>
                <h3 className="font-bold">{t.name}</h3>
                <p className="text-sm text-gray-500">
                  {t.role}
                </p>
              </div>
            </div>

            <button
              onClick={() => deleteTestimonial(t.$id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
