// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id?: string | string[] | undefined
  name?: string
  message?: string | undefined
  data?: object
  headers?: string | string[] | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}notes`).then(
      (res) => res.json(),
    )
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
