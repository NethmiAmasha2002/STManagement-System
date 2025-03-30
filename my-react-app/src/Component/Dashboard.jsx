// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSearch, FaUserGraduate, FaBook, FaBell, FaPlus, FaCalendarAlt, FaTachometerAlt, FaUsersCog, FaGraduationCap, FaUser, FaHistory, FaClipboardList } from 'react-icons/fa';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import '../App.css';
// import studentIcon from '../images/Student.png'; // Update with actual icon path
// import courseIcon from '../images/Course.jpeg'; // Update with actual icon path
// import reminderIcon from '../images/reminder.jpeg'; // Update with actual icon path

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [studentYear, setStudentYear] = useState('');
//   const [semester, setSemester] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [date, setDate] = useState(new Date());

//   // Navigation functions
//   function goToAddStudent() {
//     navigate('/AddStudent');
//   }

//   function goToEditStudent() {
//     navigate('/EditStudent');
//   }

//   function goToDeleteStudent() {
//     navigate('/DeleteStudent');
//   }

//   function goToEditCourse() {
//     navigate('/EditCourse');
//   }

//   function goToRejister() {
//     navigate('/register');
//   }

//   function goToStudents() {
//     navigate('/Students');
//   }

//   function goToCourseDetails() {
//     navigate('/CourseDetails');
//   }

//   function goToReminders() {
//     navigate('/Reminders');
//   }

//   function goToLogin() {
//     navigate('/');
//   }

//   // New function for Audit Navigation
//   function goToAudit() {
//     navigate('/Audit');
//   }

//   // Sample student data
//   const students = [
//     { id: 1, name: "Student 1" },
//     { id: 2, name: "Student 2" },
//     { id: 3, name: "Student 3" },
//     { id: 4, name: "Student 4" },
//   ];

//   // Function to handle student card actions
//   function handleStudentEdit(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/EditStudent');
//   }

//   function handleStudentDelete(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/DeleteStudent');
//   }

//   return (
//     <div className="dashboard-container">
      
//       <div className="dashboard-main">
//         {/* Sidebar */}
//         <div className="dashboard-sidebar">
//           <div className="sidebar-header">
//             <FaTachometerAlt />
//             <span>Admin Dashboard</span>
//           </div>
          
//           <div className="sidebar-menu">
//             <button className="sidebar-menu-item active" onClick={goToAddStudent}>
//               <FaUserGraduate className="sidebar-icon" />
//               <span>Add Student</span>
//             </button>
            
//             <button className="sidebar-menu-item" onClick={goToEditStudent}>
//               <FaUsersCog className="sidebar-icon" />
//               <span>Edit Student</span>
//             </button>
            
//             <button className="sidebar-menu-item" onClick={goToDeleteStudent}>
//               <FaUserGraduate className="sidebar-icon" />
//               <span>Delete Student</span>
//             </button>
            
//             <button className="sidebar-menu-item" onClick={goToEditCourse}>
//               <FaBook className="sidebar-icon" />
//               <span>Add Courses</span>
//             </button>
            
//             <button className="sidebar-menu-item" onClick={goToRejister}>
//               <FaBook className="sidebar-icon" />
//               <span>Register Admin</span>
//             </button>

//             {/* New Audit Notifications Button */}
//             <button className="sidebar-menu-item audit-btn" onClick={goToAudit}>
//               <FaHistory className="sidebar-icon" />
//               <span>Audit Notifications</span>
//               <span className="notification-badge">5</span> {/* Optional badge showing number of recent changes */}
//             </button>
//           </div>
          
//           {/* Calendar - Using react-calendar */}
//           <div className="sidebar-calendar">
//             <div className="calendar-title">
//               <FaCalendarAlt />
//               <span>Calendar</span>
//             </div>
//             <Calendar 
//               onChange={setDate} 
//               value={date}
//               className="custom-calendar"
//             />
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <div className="dashboard-content">
//           {/* Top Bar */}
//           <div className="dashboard-topbar">
//             <div className="search-container">
//               <FaSearch className="search-icon" />
//               <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//             </div>
            
//             <button className="logout-button" onClick={goToLogin}>
//               Logout
//             </button>
//           </div>
          
//           {/* Stats Overview */}
//           <div className="stats-overview">
//             <div className="stat-card">
//               <div className="stat-icon students-icon">
//                 <FaUserGraduate />
//               </div>
//               <div className="stat-details">
//                 <div className="stat-value">130</div>
//                 <div className="stat-label">Total Students</div>
//               </div>
//             </div>
            
//             <div className="stat-card">
//               <div className="stat-icon courses-icon">
//                 <FaBook />
//               </div>
//               <div className="stat-details">
//                 <div className="stat-value">24</div>
//                 <div className="stat-label">Courses</div>
//               </div>
//             </div>
            
//             <div className="stat-card">
//               <div className="stat-icon semesters-icon">
//                 <FaGraduationCap />
//               </div>
//               <div className="stat-details">
//                 <div className="stat-value">2</div>
//                 <div className="stat-label">Active Semester</div>
//               </div>
//             </div>
            
//             <div className="stat-card">
//               <div className="stat-icon reminders-icon">
//                 <FaBell />
//               </div>
//               <div className="stat-details">
//                 <div className="stat-value">8</div>
//                 <div className="stat-label">Reminders</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Filters - Updated with dark select boxes */}
//           <div className="filters-container">
//             <div className="filter-group">
//               <label className="filter-label">Student's Year:</label>
//               <select 
//                 value={studentYear}
//                 onChange={(e) => setStudentYear(e.target.value)}
//                 className="filter-select dark-select"
//               >
//                 <option value="">Select Year</option>
//                 <option value="1">Intake 39</option>
//                 <option value="2">Intake 40</option>
//                 <option value="3">Intake 41</option>
//                 <option value="4">Intake 42</option>
//               </select>
//             </div>
            
           
//           </div>
          
//           {/* Feature Cards */}
//           <div className="feature-cards">
//             <div className="feature-card" onClick={goToStudents}>
//               <div className="feature-card-icon students-bg">
//                 <img src={studentIcon} alt="Students" className="feature-icon" />
//               </div>
//               <div className="feature-card-title">Students Management</div>
//               <div className="feature-card-description">
//                 View and manage all student records
//               </div>
//             </div>
            
//             <div className="feature-card" onClick={goToCourseDetails}>
//               <div className="feature-card-icon courses-bg">
//                 <img src={courseIcon} alt="Course Details" className="feature-icon" />
//               </div>
//               <div className="feature-card-title">Course Details</div>
//               <div className="feature-card-description">
//                 Manage course information and schedules
//               </div>
//             </div>
            
//             <div className="feature-card" onClick={goToReminders}>
//               <div className="feature-card-icon reminders-bg">
//                 <img src={reminderIcon} alt="Reminders" className="feature-icon" />
//               </div>
//               <div className="feature-card-title">Reminders</div>
//               <div className="feature-card-description">
//                 Set important deadlines and reminders
//               </div>
//             </div>
//           </div>
          
//           {/* Student List */}
//           <div className="students-section">
//             <div className="section-header">
//               <h3 className="section-title">Recent Students</h3>
//               <button className="view-all-btn" onClick={goToStudents}>
//                 View All
//               </button>
//             </div>
            
//             <div className="students-grid">
//               {students.map(student => (
//                 <div key={student.id} className="student-card">
//                   <div className="student-avatar">
//                     <img src={studentIcon} alt="Student" className="student-icon" />
//                   </div>
//                   <div className="student-name">{student.name}</div>
//                   <div className="student-actions">
//                     <a 
//                       href="/EditStudent"
//                       className="student-action-btn edit"
//                       onClick={handleStudentEdit}
//                     >
//                       Edit
//                     </a>
//                     <a 
//                       href="/DeleteStudent"
//                       className="student-action-btn delete"
//                       onClick={handleStudentDelete}
//                     >
//                       Delete
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <button className="add-student-btn" onClick={goToAddStudent}>
//               <FaPlus className="add-icon" /> Add New Student
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBook, FaBell, FaPlus, FaCalendarAlt, FaTachometerAlt, FaGraduationCap, FaUser, FaHistory, FaClipboardList } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import studentIcon from '../images/Student.png'; // Update with actual icon path
import courseIcon from '../images/Course.jpeg'; // Update with actual icon path
import reminderIcon from '../images/reminder.jpeg'; // Update with actual icon path

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentYear, setStudentYear] = useState('');
  const [semester, setSemester] = useState('');
  const [date, setDate] = useState(new Date());

  // Navigation functions
  function goToAddStudent() {
    navigate('/AddCourse');
  }

  function goToDeleteStudent() {
    navigate('/DeleteStudent');
  }

  function goToEditCourse() {
    navigate('/EditCourse');
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

  // Sample student data
  const students = [
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
    { id: 4, name: "Student 4" },
  ];

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
                <div className="stat-value">130</div>
                <div className="stat-label">Total Students</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon courses-icon">
                <FaBook />
              </div>
              <div className="stat-details">
                <div className="stat-value">24</div>
                <div className="stat-label">Courses</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon semesters-icon">
                <FaGraduationCap />
              </div>
              <div className="stat-details">
                <div className="stat-value">2</div>
                <div className="stat-label">Active Semester</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon reminders-icon">
                <FaBell />
              </div>
              <div className="stat-details">
                <div className="stat-value">8</div>
                <div className="stat-label">Reminders</div>
              </div>
            </div>
          </div>
          
          {/* Filters - Updated with dark select boxes */}
          <div className="filters-container">
            <div className="filter-group">
              <label className="filter-label">Student's Year:</label>
              <select 
                value={studentYear}
                onChange={(e) => setStudentYear(e.target.value)}
                className="filter-select dark-select"
              >
                <option value="">Select Year</option>
                <option value="1">Intake 39</option>
                <option value="2">Intake 40</option>
                <option value="3">Intake 41</option>
                <option value="4">Intake 42</option>
              </select>
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
                  {/* Edit and Delete buttons removed */}
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