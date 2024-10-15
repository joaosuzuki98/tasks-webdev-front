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

  const openModal = (day) => {
    setSelectedDay(day)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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

  // TODO: Arrumar o dia, pois ele não está sendo renderizado automaticamente após
  // ser adicionado
  const addTask = (newTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [newTask.tas_day]: [...(prevTasks[newTask.tas_day] || []), newTask]
    }))
    console.log("Novo estado de tasks:", tasks)
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
          >
            <AddButton onClick={() => openModal(day)} />
          </TaskBlock>
        ))}
      </DaysContainer>

      {isModalOpen && (
        <TaskModal day={selectedDay} onClose={closeModal} onAddTask={addTask} />
      )}  
    </div>
  );
}

export default App;
