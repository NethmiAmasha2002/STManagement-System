import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Component/Home';
import Login from './Component/Login';
import Register from './Component/Register';
import ForgetPss from './Component/ForgetPss'; 
import Dashboard from './Component/Dashboard';
import AddStudent from './Component/AddStudent';
import DeleteStudent from './Component/DeleteStudent';
import Students from './Component/Student';
import CourseDetails from './Component/CourseDetails';
import Reminders from './Component/Reminder';
import EditCourse from './Component/EditCourse';
import EditStudent from './Component/EditStudent';
import Audit from './Component/Audit';
import AddCourseForm from './Component/AddCourse';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Router>
      <Header />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/EditStudent" element={<EditStudent />} />
        <Route path="/DeleteStudent" element={<DeleteStudent />} />
        <Route path="/EditCourse" element={<EditCourse />} /> 
        <Route path="/Students" element={<Students />} />
        <Route path="/CourseDetails" element={<CourseDetails />} />
        <Route path="/EditCourse" element={<EditCourse />} />
        <Route path="/Reminders" element={<Reminders />} />
       <Route path="/register" element={<Register />} />
       <Route path="/ForgetPss" element={<ForgetPss />} />
      <Route path="/Audit" element={<Audit/>}/>
      <Route path="/AddCourse" element={<AddCourseForm/>}/>

      <Route path="/EditStudent/:id" element={<EditStudent />} />
      </Routes>
      <Footer />
    </Router>
      </div>
      
    </>
  );
}

export default App
