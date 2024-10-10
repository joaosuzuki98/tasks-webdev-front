import React from 'react'
import AddButton from '../AddButton/AddButton'

function DaysContainer() {
  return (
    <div className='grid grid-cols-7 gap-x-[30px] col-start-1 col-end-[15] row-span-6 bg-secondary-black rounded-xl'>
        <div className='col-span-1 p-[20px] border-r-2 border-[#373942] flex flex-col h-full'>
            <h3 className='text-xl'>
                Monday
            </h3>

            <div className='flex flex-col items-center'>
                <AddButton />
            </div>
        </div>          
        <div className='col-span-1 p-[20px] border-r-2 border-[#373942]'>
            <h3 className='text-xl'>
                Tuesday
            </h3>
        </div>          
        <div className='col-span-1 p-[20px] border-r-2 border-[#373942]'>
            <h3 className='text-xl'>
                Wednesday
            </h3>
        </div>          
        <div className='col-span-1 p-[20px] border-r-2 border-[#373942]'>
            <h3 className='text-xl'>
                Thursday
            </h3>
        </div>          
        <div className='col-span-1 p-[20px] border-r-2 border-[#373942]'>
            <h3 className='text-xl'>
                Friday
            </h3>
        </div>          
        <div className='col-span-1 p-[20px] border-r-2 border-[#373942]'>
            <h3 className='text-xl'>
                Saturday
            </h3>
        </div>          
        <div className='col-span-1 p-[20px]'>
            <h3 className='text-xl'>
                Sunday
            </h3>
        </div>        
    </div>
  )
}

export default DaysContainer
