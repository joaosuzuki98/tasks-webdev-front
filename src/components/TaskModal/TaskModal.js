import React, { useState } from 'react'
import api from '../../services/api'

const TaskModal = ({ day, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('')
  const [taskStatus, setTaskStatus] = useState(true)

  const handleSwitchChange = () => {
    setTaskStatus(!taskStatus);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const taskData = {
      tas_name: taskName,
      tas_day: day,
      tas_status: taskStatus
    }

    try {
      await api
        .post("/tasks", taskData)
        .then(response => console.log(response))
        onAddTask(taskData)
    } catch(err) {
      console.log(err)
    }

    setTaskName('')
    setTaskStatus(true)

    onClose()
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div onClick={handleBackgroundClick} className="h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed z-10 top-0">
      <div className="absolute w-[400px] bg-[#272727] top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] rounded">
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
          <h1 className='mb-4 text-xl font-bold'>Add you task</h1>
          <label htmlFor="taskName">Task name</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="bg-[#3c3c3c] border-1 border-[#131419] p-2 rounded mb-4 mt-1"
          />
          
          <div className='flex w-full justify-between'>
            <label htmlFor="taskStatus">Status</label>
            <div className="flex items-center">
              <label className='flex cursor-pointer select-none items-center'>
                <div className='relative'>
                  <input
                    type='checkbox'
                    checked={taskStatus}
                    onChange={handleSwitchChange}
                    className='sr-only'
                  />
                  <div className='block h-8 w-14 rounded-full bg-[#E5E7EB]'></div>
                  <div className='dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition'>
                    {taskStatus ? (
                      <span className='active'>
                        <svg
                          width='11'
                          height='8'
                          viewBox='0 0 11 8'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z'
                            fill='white'
                            stroke='white'
                            strokeWidth='0.4'
                          ></path>
                        </svg>
                      </span>
                    ) : (
                      <span className='inactive text-body-color'>
                        <svg
                          className='h-4 w-4 stroke-current'
                          fill='none'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                          ></path>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="mt-4 mb-4 p-2 bg-blue-500 text-white rounded">Create Task</button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskModal;