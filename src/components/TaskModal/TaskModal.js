import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import './TaskModal.css'

const TaskModal = ({ day, onClose, onAddTask, onUpdateTask, existingTask, onDeleteTask }) => {
  const [taskName, setTaskName] = useState(existingTask ? existingTask.tas_name : '')
  const [taskStatus, setTaskStatus] = useState(existingTask ? existingTask.tas_status : true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (existingTask) {
      setTaskName(existingTask.tas_name)
      setTaskStatus(existingTask.tas_status)
    }
  }, [existingTask])

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
      if (existingTask) {
        await api
          .put(`/tasks/${existingTask.tas_name}`, taskData)
          .then(response => console.log(response))
          onUpdateTask(existingTask.tas_id, taskData)
      } else {
        await api
          .post("/tasks", taskData)
          onAddTask(taskData)
      }

      setErrorMessage('')
      onClose()
    } catch(err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error)
      } else {
        setErrorMessage('An unexpected error occurred.')
      }
    }

    setTaskName('')
    setTaskStatus(true)
  }

  const handleDelete = async () => {
    try {
      await api
        .delete(`/tasks/${existingTask.tas_name}`)
        onDeleteTask(existingTask)
        onClose()
    } catch(err) {
      console.log(err)
    }
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
          <h1 className='mb-4 text-xl font-bold'>{existingTask ? 'Edit task' : 'Add task'}</h1>
          <label htmlFor="taskName">Task name</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="bg-[#3c3c3c] border-1 border-[#131419] p-2 rounded mb-4 mt-1"
          />

          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          
          <div className='flex w-full justify-between'>
            <label htmlFor="taskStatus">Status</label>
            <div className="flex items-center">
            <span className="flex items-center ml-4">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={taskStatus}
                    onChange={handleSwitchChange}
                  />
                  <span className="slider round"></span>
                </label>
              </span>
            </div>
          </div>

          <button type="submit" className="mt-4 mb-4 p-2 bg-blue-500 text-white rounded">{existingTask ? 'Update task' : 'Create task'}</button>
          {existingTask && (
            <button
              type='button'
              onClick={handleDelete}
              className='mt-4 mb-4 p-2 bg-red-500 text-white rounded'
            >
              Delete task
            </button>
          )}
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