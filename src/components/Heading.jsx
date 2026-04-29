import React from 'react'
import Upload from './Upload'

const Heading = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center pt-[5%] gap-2'>
      <h1 className='text-5xl font-semibold '>Resume<span className='text-blue-600'>AI</span></h1>
      <p className='text-gray-500 tracking-wide text-lg'>Analyze your resume against any job description in seconds.</p>
      <Upload />
    </div>
  )
}

export default Heading
