import Image from 'next/image'
import React, { useState } from 'react'
// import ImageHigh from '@/assets/image.jpg'
// import HeavyComponent from '@/components/HeavyComponent'
import dynamic from 'next/dynamic'
import { dataStore } from '@/store/dataStore'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  ssr: false,
  loading: () => <p>loading...</p>,
})

export default function About() {
  const [show, setShow] = useState(false)
  const { inc } = dataStore()
  return (
    <div>
      <h1>About Page</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShow(!show)}
      >
        Show Component
      </button>
      <Image src={'/image.jpg'} width={1000} height="800" alt="" />
      {/* <img {...ImageHigh} /> */}

      {show && <HeavyComponent />}
      <button onClick={() => inc()}>Count ++</button>
    </div>
  )
}
