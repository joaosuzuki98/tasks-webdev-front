import React from 'react'

function AddButton({ onClick }) {
  return (
    <div onClick={onClick} className='mt-[40px] flex flex-col items-center justify-center w-full h-[145px] bg-light-green rounded-2xl outline-2 outline-dashed outline-[#56E39F] cursor-pointer'>
      <div className='rounded-full bg-main-green w-8 h-8 flex items-center justify-center'>
        <i class="color-dark-green fa-solid fa-plus"></i>
      </div>
      <p className='font-bold text-md color-main-green'>Add task</p>
    </div>
  )
}

export default AddButton
