

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, query, orderByChild, equalTo, remove, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import "../App.css";
import studentIcon from "../images/Remove.png";

function DeleteStudent() {
  const navigate = useNavigate();
  const db = getDatabase();
  const auth = getAuth();

  // Search filters state
  const [filters, setFilters] = useState({
    firstName: "",
    studentId: ""
  });

  // Selected student state
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: ""
  });

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };



const handleFilter = async (e) => {
    e.preventDefault();
    
    try {
        const studentsRef = ref(db, "Students");
        let studentData = null;

        if (filters.studentId) {
            // 🔹 Directly fetch by student ID (fastest method)
            const studentRef = ref(db, `Students/${filters.studentId}`);
            const snapshot = await get(studentRef);

            if (snapshot.exists()) {
                studentData = { id: filters.studentId, ...snapshot.val() };
            }
        } else if (filters.firstName) {
            // 🔹 Query using indexed "firstName"
            const studentQuery = query(studentsRef, orderByChild("firstName"), equalTo(filters.firstName));
            const snapshot = await get(studentQuery);

            if (snapshot.exists()) {
                const students = snapshot.val();
                const firstMatch = Object.entries(students)[0]; // Get the first matched student
                if (firstMatch) {
                    studentData = { id: firstMatch[0], ...firstMatch[1] };
                }
            }
        } else {
            setNotification({ show: true, message: "Please enter a name or student ID", type: "error" });
            return;
        }

        if (studentData) {
            setSelectedStudent(studentData);
        } else {
            setNotification({ show: true, message: "No student found", type: "error" });
            setSelectedStudent(null);
        }
    } catch (error) {
        console.error("Error searching for student:", error);
        setNotification({ show: true, message: "Error searching for student", type: "error" });
    }
};


  // Handle student removal
  const handleRemove = async () => {
    if (!selectedStudent) return;

    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedStudent.indexNumber}?`);
    if (!confirmDelete) return;

    try {
      await remove(ref(db, `Students/${selectedStudent.id}`));
      await logUpdateDetails(selectedStudent.indexNumber,"Delete data for student");
      setNotification({ show: true, message: "Student removed successfully!", type: "success" });
      setSelectedStudent(null);
      setFilters({ firstName: "", studentId: "" }); 
    } catch (error) {
      console.error("Error deleting student:", error);
      setNotification({ show: true, message: "Error deleting student", type: "error" });
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
        description: `${description} for student with ID: ${id}`,
        updatedBy: user.email || "Unknown User",
        updatedAt: new Date().toISOString(),
        studentId: id ,// Only saving the student ID for reference
        type: "Student Management"
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

  // Navigate back to previous page
  const handleBack = () => {
    navigate("/Students");
  };

  return (
    <div className="delete-student-page">
      <div className="delete-student-container">
        <div className="delete-content">
          {/* Search Filters */}
          <div className="search-filters-section">
            <h3 className="section-title">Search Student</h3>
            <div className="search-filters">
              <div className="filter-group">
                <label className="filter-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={filters.firstName}
                  onChange={handleFilterChange}
                  className="filter-input"
                  placeholder="Enter first name"
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={filters.studentId}
                  onChange={handleFilterChange}
                  className="filter-input"
                  placeholder="Enter student ID"
                />
              </div>

              <button className="filter-button" onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>

          {/* Student Details */}
          {selectedStudent && (
            <div className="student-details-section">
              <h3 className="section-title">Student Information</h3>
              <div className="student-details">
                <div className="student-profile">
                  <img src={studentIcon} alt="Student" className="student-icon" />
                </div>
                
                <div className="student-info">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-text">{selectedStudent.firstName} {selectedStudent.lastName}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">Student ID:</span>
                    <span className="info-text">{selectedStudent.indexNumber}</span>
                  </div>
                  
                  
                  
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-text">{selectedStudent.email}</span>
                  </div>

                  
                  
                  <button className="remove-button" onClick={handleRemove}>
                    <i className="fas fa-trash-alt"></i> Remove Student
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default DeleteStudent;
