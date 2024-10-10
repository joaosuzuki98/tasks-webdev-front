import './App.css';
import DaysContainer from './components/DaysContainer/DaysContainer';
import Header from './components/Header/Header'
import TaskBlock from './components/TaskBlock/TaskBlock';
import AddButton from './components/AddButton/AddButton';

function App() {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


  return (
    <div className="main-container">
      <Header />
      <DaysContainer>
        {weekdays.map(day => (
          <TaskBlock key={day} dayName={day}>
            <AddButton />
          </TaskBlock>
        ))}
      </DaysContainer>
    </div>
  );
}

export default App;
