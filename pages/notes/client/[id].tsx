import useSWR from 'swr'
import { useRouter } from 'next/router'

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
  data: ListNotes
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NotesDetailClientPage() {
  const router = useRouter()
  const { id } = router.query

  const {
    data: notes,
    isLoading,
    error,
  } = useSWR<Notes>(
    id ? `https://service.pace11.my.id/api/note/${id}` : null,
    fetcher,
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>
  if (!notes) return <div>No data found</div>

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-white shadow-sm rounded-lg">
        <h1>{notes.data.title}</h1>
        <h1>{notes.data.description}</h1>
      </div>
    </div>
  )
}
