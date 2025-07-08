import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type ListNotes = {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

type Notes = {
  success: boolean
  message: string
  data: ListNotes[]
}

export default function NoteClientPage() {
  const router = useRouter()
  const {
    data: notes,
    isLoading,
    error,
  } = useSWR<Notes>('https://service.pace11.my.id/api/notes', fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 3000,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>
  if (!notes?.data.length) return <div>No data found</div>

  return (
    <div className="grid grid-cols-4 gap-4">
      {notes?.data?.map((note: ListNotes) => (
        <div
          key={note.id}
          className="p-4 bg-white shadow-sm rounded-lg cursor-pointer"
          onClick={() => router.push(`/notes/client/${note.id}`)}
        >
          <h1>{note.title}</h1>
          <h1>{note.description}</h1>
        </div>
      ))}
    </div>
  )
}
