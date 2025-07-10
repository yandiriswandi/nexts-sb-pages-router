import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi !'),
  description: z.string().min(1, 'Title wajib diisi !'),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  console.log('BASE_API_URL', process.env.BASE_API_URL)

  try {
    const validatedData = formSchema.parse(req.body)
    const response = await fetch(`${process.env.BASE_API_URL}note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    }).then((res) => res.json())

    if (response.status) {
      return res.status(200).json(response)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = Object.keys(error.formErrors.fieldErrors)?.reduce(
        (acc, key) => {
          acc[key] = error.formErrors.fieldErrors[key]?.[0] || 'unknown error'
          return acc
        },
        {} as Record<string, string>,
      )
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}
