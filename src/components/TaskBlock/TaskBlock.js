import React from 'react'
import styles from './TaskBlock.module.css'

function TaskBlock({dayName, children, border, position, tasks}) {
  return (
    <div className={`col-span-1 px-[20px] border-r-2 border-[#373942] flex flex-col h-full ${border} ${position} ${styles.addButtonContainer}`}>
        <h3 className='text-xl mb-2'>
            {dayName}
        </h3>

        <div>
          {tasks.map((task, index) => (
            <div key={index} className='w-full p-2 mb-2 bg-[#8367C7] text-white rounded cursor-pointer'>
              <p>{task.tas_name} 
              <span className='ml-2'>{task.tas_status ? 
                <i class="fa-solid fa-check"></i> : 
                <i class="fa-solid fa-hourglass"></i>}</span>
              </p>
            </div>
          ))}
        </div>

        <div className={`flex flex-col items-center ${styles.addButtonWrapper}`}>
            {children}
        </div>
    </div>
  )
}

export default TaskBlock
