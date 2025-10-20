import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Student from './components/Student/Student';
import FormM from './components/FormM/FormM';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/student' element={<Student />} />
        <Route path='/form' element={<FormM />} />
      </Routes>
    </div>
  );
};

export default App;
