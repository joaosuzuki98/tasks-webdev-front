import React from 'react'

function TaskBlock({dayName, children}) {
  return (
    <div className='col-span-1 px-[20px] border-r-2 border-[#373942] flex flex-col h-full'>
        <h3 className='text-xl'>
            {dayName}
        </h3>

        <div className='flex flex-col items-center'>
            {children}
        </div>
    </div> 
  )
}

export default TaskBlock
