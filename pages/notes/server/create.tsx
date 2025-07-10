import { useRouter } from 'next/router'
import React, { useState, FormEvent } from 'react'

interface NotesType {
  title: string
  description: string
}

export default function NotesServerCreate() {
  const router = useRouter()
  const [payload, setPayload] = useState<NotesType>({
    title: '',
    description: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{
    errors: { [key: string]: string }
  } | null>(null)

  const onChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPayload({ ...payload, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const data = await response.json()
        setError(data)
        return
      }

      const data = await response.json()
      if (data.status === 'Created') {
        router.push('/notes/server')
      }
      console.log(data)
    } catch (error) {
      console.error('An unexpected error happened:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Note</h2>
      <form action="" onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={payload.title}
            onChange={(event) => onChangeData(event)}
            placeholder="Input title..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error && typeof error === 'object' && error.errors && (
            <small className="text-red-500">{error.errors.title}</small>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={payload.description}
            onChange={(event) => onChangeData(event)}
            placeholder="Input description..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error && typeof error === 'object' && error.errors && (
            <small className="text-red-500">{error.errors.description}</small>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
