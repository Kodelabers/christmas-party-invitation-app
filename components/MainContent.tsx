"use client"

import React, { Suspense } from 'react'
import LogoIcon from './KodelabIcon'
import Snowflakes from './Snowflakes'
import HomeContent from './HomeContent'

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