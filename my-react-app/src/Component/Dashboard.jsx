
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBook, FaBell, FaPlus, FaCalendarAlt, FaTachometerAlt, FaGraduationCap, FaUser, FaHistory, FaClipboardList } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import studentIcon from '../images/Student.png'; // Update with actual icon path
import courseIcon from '../images/Course.jpeg'; // Update with actual icon path
import reminderIcon from '../images/reminder.jpeg'; // Update with actual icon path
import { ref, get } from "firebase/database";
import { database } from "../firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentYear, setStudentYear] = useState('');
  const [semester, setSemester] = useState('');
  const [date, setDate] = useState(new Date());

  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [reminderCount, setReminderCount] = useState(0);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const studentsRef = ref(database, "Students");
        const snapshot = await get(studentsRef);

        if (snapshot.exists()) {
          const studentsData = snapshot.val();
          const count = Object.keys(studentsData).length; // Count total students
          setStudentCount(count);
        } else {
          setStudentCount(0);
        }
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchStudentCount();
  }, []);

  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const coursesRef = ref(database, "Courses");
        const snapshot = await get(coursesRef);

        if (snapshot.exists()) {
          const coursesData = snapshot.val();
          const count = Object.keys(coursesData).length; // Count total courses
          setCourseCount(count);
        } else {
          setCourseCount(0);
        }
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    };

    fetchCourseCount();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    const fetchTodayReminders = async () => {
      try {
        const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
        const remindersRef = ref(database, "Reminders");
        const snapshot = await get(remindersRef);

        if (snapshot.exists()) {
          const remindersData = snapshot.val();
          const todayReminders = Object.values(remindersData).filter(
            (reminder) => reminder.date === today
          );

          setReminderCount(todayReminders.length); // Count today's reminders
        } else {
          setReminderCount(0);
        }
      } catch (error) {
        console.error("Error fetching today's reminders:", error);
      }
    };

    fetchTodayReminders();
  }, []);
  
  useEffect(() => {
    const fetchRecentStudents = async () => {
      try {
        const recentStudentRef = ref(database, "RecentStudent");
        const snapshot = await get(recentStudentRef);

        if (snapshot.exists()) {
          // Convert object to array and sort by timestamp (if needed)
          const studentsList = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            name: data.studentName,
            indexNumber: data.indexNumber, 
          }));
          setStudents(studentsList);
        } else {
          setStudents([]); // If no students exist
        }
      } catch (error) {
        console.error("Error fetching recent students:", error);
      }
    };

    fetchRecentStudents();
  }, []);

  // Navigation functions
  function goToAddStudent() {
    navigate('/AddStudent');
  }

  function goToDeleteStudent() {
    navigate('/DeleteStudent');
  }

  function goToEditCourse() {
    navigate('/AddCourse');
  }

  function goToRejister() {
    navigate('/register');
  }

  function goToStudents() {
    navigate('/Students');
  }

  function goToCourseDetails() {
    navigate('/CourseDetails');
  }

  function goToReminders() {
    navigate('/Reminders');
  }

  function goToLogin() {
    navigate('/');
  }

  // New function for Audit Navigation
  function goToAudit() {
    navigate('/Audit');
  }


  return (
    <div className="dashboard-container">
      
      <div className="dashboard-main">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <FaTachometerAlt />
            <span>Admin Dashboard</span>
          </div>
          
          <div className="sidebar-menu">
            <button className="sidebar-menu-item active" onClick={goToAddStudent}>
              <FaUserGraduate className="sidebar-icon" />
              <span>Add Student</span>
            </button>
            
            <button className="sidebar-menu-item" onClick={goToDeleteStudent}>
              <FaUserGraduate className="sidebar-icon" />
              <span>Delete Student</span>
            </button>
            
            <button className="sidebar-menu-item" onClick={goToEditCourse}>
              <FaBook className="sidebar-icon" />
              <span>Add Courses</span>
            </button>
            
            <button className="sidebar-menu-item" onClick={goToRejister}>
              <FaBook className="sidebar-icon" />
              <span>Register Admin</span>
            </button>

            {/* New Audit Notifications Button */}
            <button className="sidebar-menu-item audit-btn" onClick={goToAudit}>
              <FaHistory className="sidebar-icon" />
              <span>Audit Notifications</span>
              <span className="notification-badge">5</span> {/* Optional badge showing number of recent changes */}
            </button>
          </div>
          
          {/* Calendar - Using react-calendar */}
          <div className="sidebar-calendar">
            <div className="calendar-title">
              <FaCalendarAlt />
              <span>Calendar</span>
            </div>
            <Calendar 
              onChange={setDate} 
              value={date}
              className="custom-calendar"
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="dashboard-content">
          {/* Top Bar */}
          <div className="dashboard-topbar">
            <div className="topbar-spacer"></div>
            <button className="logout-button" onClick={goToLogin}>
              Logout
            </button>
          </div>
          
          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon students-icon">
                <FaUserGraduate />
              </div>
              <div className="stat-details">
                <div className="stat-value"> {studentCount}</div>
                <div className="stat-label">Total Students:</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon courses-icon">
                <FaBook />
              </div>
              <div className="stat-details">
                <div className="stat-value">{courseCount}</div>
                <div className="stat-label">Total Courses</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon semesters-icon">
                <FaGraduationCap />
              </div>
              <div className="stat-details">
                <div className="stat-label">2 Active Semesters </div>
                <div className="stat-label">Per Year</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon reminders-icon">
                <FaBell />
              </div>
              <div className="stat-details">
                <div className="stat-value">{reminderCount}</div>
                <div className="stat-label">Today's Reminders</div>
              </div>
            </div>
          </div>
          
          
          {/* Feature Cards */}
          <div className="feature-cards">
            <div className="feature-card" onClick={goToStudents}>
              <div className="feature-card-icon students-bg">
                <img src={studentIcon} alt="Students" className="feature-icon" />
              </div>
              <div className="feature-card-title">Students Management</div>
              <div className="feature-card-description">
                View and manage all student records
              </div>
            </div>
            
            <div className="feature-card" onClick={goToCourseDetails}>
              <div className="feature-card-icon courses-bg">
                <img src={courseIcon} alt="Course Details" className="feature-icon" />
              </div>
              <div className="feature-card-title">Course Details</div>
              <div className="feature-card-description">
                Manage course information and schedules
              </div>
            </div>
            
            <div className="feature-card" onClick={goToReminders}>
              <div className="feature-card-icon reminders-bg">
                <img src={reminderIcon} alt="Reminders" className="feature-icon" />
              </div>
              <div className="feature-card-title">Reminders</div>
              <div className="feature-card-description">
                Set important deadlines and reminders
              </div>
            </div>
          </div>
          
          {/* Student List - Kept but without edit/delete buttons */}
          <div className="students-section">
            <div className="section-header">
              <h3 className="section-title">Recent Students</h3>
              <button className="view-all-btn" onClick={goToStudents}>
                View All
              </button>
            </div>
            
         
            <div className="students-grid">
            {students.map(student => (
              <div key={student.id} className="student-card">
                <div className="student-avatar">
                  <img src={studentIcon} alt="Student" className="student-icon" />
                </div>
                <div className="student-name">{student.name}</div>
                <div className="student-name">{student.indexNumber}</div>
              </div>
            ))}
          </div>
            
            <button className="add-student-btn" onClick={goToAddStudent}>
              <FaPlus className="add-icon" /> Add New Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;