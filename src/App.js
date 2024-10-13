import { useState } from 'react'
import './App.css'
import DaysContainer from './components/DaysContainer/DaysContainer'
import Header from './components/Header/Header'
import TaskBlock from './components/TaskBlock/TaskBlock'
import AddButton from './components/AddButton/AddButton'
import TaskModal from './components//TaskModal/TaskModal'

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

  return (
    <div className="main-container">
      <Header />
      <DaysContainer>
        {weekdays.map(day => (
          <TaskBlock key={day} dayName={day}
            border={day === 'Sunday' ? 'border-none' : ''}
            position={day !== 'Monday' ? 'pl-0 pr-8' : ''}
          >
            <AddButton onClick={() => openModal(day)} />
          </TaskBlock>
        ))}
      </DaysContainer>

      {isModalOpen && (
        <TaskModal day={selectedDay} onClose={closeModal} />
      )}  
    </div>
  );
}

export default App;
