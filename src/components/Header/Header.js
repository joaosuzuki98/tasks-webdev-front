import React from 'react'

function Header() {
  const d = new Date()
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const currentMonth = month[d.getMonth()]
  return (
    <div className="col-start-1 col-end-[15]">
        <div className='flex items-center'>
            <h1 className='text-[3rem]'>
                Tasks
            </h1>

            <h2 className='text-2xl font-bold color-light-black absolute left-1/2 transform -translate-x-1/2'>{currentMonth}</h2>
        </div>
    </div>
  )
}

export default Header
