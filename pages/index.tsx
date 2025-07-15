// import styles from '@/styles/Home.module.css'
// import { Geist, Geist_Mono } from 'next/font/google'
// import Head from 'next/head'
// import Image from 'next/image'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })
import { dataStore } from '@/store/dataStore'

export default function Home() {
  const { inc } = dataStore()
  return (
    <div>
      Index Page <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <button onClick={() => inc()}>Count ++</button>
    </div>
  )
}
