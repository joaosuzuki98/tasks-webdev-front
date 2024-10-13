import React from 'react'
import styles from './TaskBlock.module.css'

function TaskBlock({dayName, children, border, position}) {
  return (
    <div className={`col-span-1 px-[20px] border-r-2 border-[#373942] flex flex-col h-full ${border} ${position} ${styles.addButtonContainer}`}>
        <h3 className='text-xl'>
            {dayName}
        </h3>

        <div className={`flex flex-col items-center ${styles.addButtonWrapper}`}>
            {children}
        </div>
    </div>
  )
}

export default TaskBlock
