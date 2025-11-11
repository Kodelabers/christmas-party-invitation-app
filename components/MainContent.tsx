"use client"

import { Suspense } from 'react'
import HomeContent from './HomeContent'
import LogoIcon from './KodelabIcon'
import Snowflakes from './Snowflakes'

const MainContent = () => {
  return (
    <Suspense fallback={
        <div className="min-h-screen flex flex-col">
          <Snowflakes />
          <div className="flex-1 flex items-center justify-center">
            <LogoIcon className="w-24 h-24 animate-pulse" />
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
  )
}
export default MainContent