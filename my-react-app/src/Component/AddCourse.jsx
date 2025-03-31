






import React, { useState } from 'react';
import { getDatabase, ref, set,  get, push } from 'firebase/database';
import { database } from '../firebase';
import "../App.css";
import teachingIcon from '../images/add.jpg'; // Update path as needed
import { getAuth } from "firebase/auth";

const AddCourseForm = () => {
  const [moduleId, setModuleId] = useState('');
  const [year, setYear] = useState('1'); // Default to first year
  const [semester, setSemester] = useState('Semester 1'); // Default to Semester 1
  const [courseName, setCourseName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const years = [
    { label: 'First Year', value: '1', semesters: ['Semester 1', 'Semester 2'] },
    { label: 'Second Year', value: '2', semesters: ['Semester 3', 'Semester 4'] },
    { label: 'Third Year', value: '3', semesters: ['Semester 5', 'Semester 6'] },
    { label: 'Fourth Year', value: '4', semesters: ['Semester 7', 'Semester 8'] }
  ];

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  
    // Get the first semester of the selected year
    const defaultSemester = years.find(y => y.value === selectedYear)?.semesters[0] || '';
    setSemester(defaultSemester);
  };

  const selectedYear = years.find((yearOption) => yearOption.value === year);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (moduleId && year && courseName) {
      try {
        const newCourse = { courseName, year, semester, moduleId };
        const courseRef = ref(database, `Courses/${moduleId}`);
        await set(courseRef, newCourse);
        logUpdateDetails(moduleId, "Add new course")
        
        // Show success notification
        setNotification({
          show: true,
          message: 'Course added successfully!',
          type: 'success'
        });
        
        // Clear form
        setCourseName('');
        setModuleId('');
        setYear('1');
        setSemester('Semester 1');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          setNotification({ show: false, message: '', type: '' });
        }, 3000);
      } catch (error) {
        console.error("Error adding course:", error);
        setNotification({
          show: true,
          message: 'Failed to add course. Please try again.',
          type: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setNotification({
        show: true,
        message: 'Please fill in all required fields.',
        type: 'error'
      });
      setIsSubmitting(false);
    }
  };

  const logUpdateDetails = async (id, description) => {
        const db = getDatabase();
        const auth = getAuth();
        const user = auth.currentUser; 
      
       // Ensure studentId is defined before saving
        if (!id) {
          console.error("Student ID is undefined");
          return;
        }
    
        // Ensure user is logged in
        if (!user) {
            console.error("No user is logged in. Cannot save log.");
            return;
        }
  
        const logsRef = ref(db, 'logs');
            const logsSnapshot = await get(logsRef);
        
            let newLogId = 1; // Default first logId
            if (logsSnapshot.exists()) {
              // Get max existing logId
              const logsArray = Object.values(logsSnapshot.val());
              const maxLogId = Math.max(...logsArray.map(log => log.logId || 0)); 
              newLogId = maxLogId + 1;
            }
    
        // Create log data with description, current user, and timestamp
        const logData = {
          logId: newLogId,
          description: `${description} for Course with ID: ${id}`,
          updatedBy: user.email || "Unknown User",
          updatedAt: new Date().toISOString(),
          studentId: id ,// Only saving the student ID for reference
          type: "Course Management"
        };
      
        // Get a reference to the 'logs' node and push the new log entry
        const logRef = ref(db, 'logs');
        push(logRef, logData)
          .then(() => {
            console.log("Log saved successfully");
          })
          .catch((error) => {
            console.error("Error saving log data:", error);
          });
      };

  return (
    <div className="add-course-page">
      <div className="add-course-container">
        <div className="add-course-content">
          <div className="add-course-header">
            <div className="add-course-title-section">
              <h2 className="add-course-title">Add New Course</h2>
              <p className="add-course-subtitle">Create a new course module for students</p>
            </div>
            <div className="teaching-icon-container">
              <img src={teachingIcon} alt="Teaching" className="teaching-icon" />
            </div>
          </div>
          
          <div className="add-course-body">
            <form onSubmit={handleSubmit} className="add-course-form">
              <div className="form-group">
                <label className="form-label">
                  <span className="form-label-icon">📚</span>
                  Course Name
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="form-input"
                  placeholder="Enter course name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <span className="form-label-icon">🔢</span>
                  Module ID
                </label>
                <input
                  type="text"
                  value={moduleId}
                  onChange={(e) => setModuleId(e.target.value)}
                  className="form-input"
                  placeholder="Enter module ID (e.g. CS2050)"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="form-label-icon">🎓</span>
                    Year
                  </label>
                  <select 
                    value={year} 
                    onChange={handleYearChange} 
                    className="form-select"
                    required
                  >
                    {years.map((yearOption) => (
                      <option key={yearOption.value} value={yearOption.value}>
                        {yearOption.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <span className="form-label-icon">📅</span>
                    Semester
                  </label>
                  <select 
                    value={semester} 
                    onChange={(e) => setSemester(e.target.value)} 
                    className="form-select"
                    required
                  >
                    {selectedYear?.semesters.map((semesterOption, index) => (
                      <option key={index} value={semesterOption}>
                        {semesterOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="add-course-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding Course...' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;