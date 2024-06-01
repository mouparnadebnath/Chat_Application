import React from 'react'

export default function Skeleton() {
  return (
    <div className='flex flex-col fill-white gap-4'>
        <div className="skeleton w-72 h-12 bg-blue-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"></div>
        <div className="skeleton w-72 h-12 bg-blue-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"></div>
        <div className="skeleton w-72 h-12 bg-blue-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"></div>
        <div className="skeleton w-72 h-12 bg-blue-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"></div>
        <div className="skeleton w-72 h-12 bg-blue-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"></div>
        <div className="skeleton w-72 h-12 bg-blue-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"></div>
        <div className="skeleton w-72 h-12 bg-blue-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"></div>
    </div>
  )
}
