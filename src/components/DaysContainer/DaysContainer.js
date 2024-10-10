import React from 'react'


function DaysContainer({children}) {
  return (
    <div className='grid grid-cols-7 gap-x-[30px] col-start-1 col-end-[15] row-span-6 bg-secondary-black rounded-xl py-[30px]'>
        {children}
    </div>
  )
}

export default DaysContainer
