'use client'

import { useEffect, useState } from 'react'
import { databases, storage } from '@/lib/appwrite'
import { ID, Query } from 'appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
const COLLECTION_ID = 'services'
const BUCKET_ID = '6986e8a4001925504f6b'

export default function ServicesCMS() {
  const [services, setServices] = useState([])
  const [uploading, setUploading] = useState(false)

  const [newService, setNewService] = useState({
    title: '',
    imageUrl: '',
    description: '',
  })

  /* ---------------- FETCH SERVICES ---------------- */
  const fetchServices = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderAsc('order')]
      )
      setServices(res.documents)
    } catch (error) {
      console.error('Fetch services failed:', error)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  /* ---------------- UPLOAD IMAGE ---------------- */
  const uploadImage = async (file) => {
    if (!file) return

    setUploading(true)

    try {
      const uploaded = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      )

      const url = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`

      setNewService(prev => ({ ...prev, imageUrl: url }))
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Image upload failed')
    }

    setUploading(false)
  }

  /* ---------------- ADD SERVICE ---------------- */
  const addService = async () => {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          ...newService,
          order: services.length + 1,
        }
      )

      setNewService({ title: '', imageUrl: '', description: '' })
      fetchServices()
    } catch (error) {
      console.error('Add failed:', error)
    }
  }

  /* ---------------- DELETE SERVICE ---------------- */
  const deleteService = async (id) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      )
      fetchServices()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Services CMS</h1>

      {/* Add New Service */}
      <div className="space-y-4 border p-6">

        <input
          className="border p-3 w-full"
          placeholder="Service Title"
          value={newService.title}
          onChange={e =>
            setNewService({ ...newService, title: e.target.value })
          }
        />

        <textarea
          className="border p-3 w-full"
          placeholder="Description"
          value={newService.description}
          onChange={e =>
            setNewService({ ...newService, description: e.target.value })
          }
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={e => uploadImage(e.target.files[0])}
          />

          {uploading && <p>Uploading...</p>}

          {newService.imageUrl && (
            <img
              src={newService.imageUrl}
              className="h-16 mt-3"
            />
          )}
        </div>

        <button
          onClick={addService}
          className="bg-black text-white px-6 py-2"
        >
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map(service => (
          <div
            key={service.$id}
            className="border p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  className="h-12 w-12 object-cover rounded"
                />
              )}

              <div>
                <h3 className="font-bold">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {service.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => deleteService(service.$id)}
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
