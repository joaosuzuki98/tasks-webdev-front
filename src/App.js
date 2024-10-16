import { useState, useEffect } from 'react'
import './App.css'
import DaysContainer from './components/DaysContainer/DaysContainer'
import Header from './components/Header/Header'
import TaskBlock from './components/TaskBlock/TaskBlock'
import AddButton from './components/AddButton/AddButton'
import TaskModal from './components/TaskModal/TaskModal'
import api from './services/api'

function App() {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const openModal = (day) => {
    setSelectedDay(day)
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setSelectedTask(task)
    setIsEditModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)

    setIsEditModalOpen(false)
    setSelectedTask(null)
  }

  const [tasks, setTasks] = useState({})

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks')
        const tasksByDay = weekdays.reduce((acc, day) => {
          acc[day] = response.data.filter(task => task.tas_day === day)
          return acc
        }, {})
        setTasks(tasksByDay);
      } catch (error) {
        console.error("Erro ao buscar as tarefas:", error)
      }
    }
    
    fetchTasks()
  }, [])

  /**
   * Render new tasks
   */
  const addTask = (newTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [newTask.tas_day]: [...(prevTasks[newTask.tas_day] || []), newTask]
    }))
    console.log("Novo estado de tasks:", tasks)
  }

  /**
   * Render updated tasks
   */
  const updateTask = (taskId, updatedTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [updatedTask.tas_day]: prevTasks[updatedTask.tas_day].map((task) =>
        task.tas_id === taskId ? { ...task, ...updatedTask } : task
      )
    }));
  };

  /**
   * Render tasks without the deleted one
   */
  const deleteTask = (taskToDelete) => {
    setTasks(prevTasks => {
      const dayTasks = prevTasks[taskToDelete.tas_day].filter(task => task.tas_name !== taskToDelete.tas_name)
      return {
        ...prevTasks,
        [taskToDelete.tas_day]: dayTasks
      }
    })
  }


  return (
    <div className="main-container">
      <Header />
      <DaysContainer>
        {weekdays.map(day => (
          <TaskBlock 
            key={day} 
            dayName={day}
            border={day === 'Sunday' ? 'border-none' : ''}
            position={day !== 'Monday' ? 'pl-0 pr-8' : ''}
            tasks={tasks[day] || []}
            onTaskClick={openEditModal}
          >
            <AddButton onClick={() => openModal(day)} />
          </TaskBlock>
        ))}
      </DaysContainer>

      {isModalOpen && (
        <TaskModal day={selectedDay} onClose={closeModal} onAddTask={addTask} />
      )}  

      {isEditModalOpen && selectedTask && (
        <TaskModal
          day={selectedTask.tas_day}
          onClose={closeModal}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          existingTask={selectedTask}
          onDeleteTask={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
