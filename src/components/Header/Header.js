import React from 'react'

function Header() {
  return (
    <div className="col-start-1 col-end-[15]">
        <div className='flex items-center'>
            <h1 className='text-[3rem]'>
                Tasks
            </h1>

            <h2 className='text-2xl font-bold color-light-black absolute left-1/2 transform -translate-x-1/2'>October</h2>
        </div>
    </div>
  )
}

export default Header
