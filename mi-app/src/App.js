import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Student from './components/Student/Student';
import FormM from './components/FormM/FormM';
import MoreInfo from './components/MoreInfo/MoreInfo';
import Register from "./components/Register/Register";
import Teacher from './components/Teacher/Teacher';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/student' element={<Student />} />
        <Route path='/form' element={<FormM />} />
        <Route path='/info' element={<MoreInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </div>
  );
};

export default App;
