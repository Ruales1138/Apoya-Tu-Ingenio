import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Student from './components/Student/Student';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/student' element={<Student />} />
      </Routes>
    </div>
  );
};

export default App;
