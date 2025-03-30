import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import studentIcon from '../images/Remove.png';

function DeleteStudent() {
  const navigate = useNavigate();
  
  // Search filters state
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    studentId: ""
  });

  // Selected student state
  const [selectedStudent, setSelectedStudent] = useState({
    name: "John Doe",
    studentId: "S001",
    degreeProgram: "BSc (Hons) in Software Engineering",
    email: "john.doe@example.com"
  });

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

  // Handle filter submission
  const handleFilter = (e) => {
    e.preventDefault();
    console.log("Filtering with:", filters);
    // In a real app, this would search for matching students
  };

  // Handle student removal
  const handleRemove = () => {
    console.log("Removing student:", selectedStudent);
    // Show confirmation notification
    setNotification({
      show: true,
      message: "Student removed successfully!",
      type: "success"
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        type: ""
      });
    }, 3000);
    
    // Clear selected student
    setSelectedStudent({
      name: "",
      studentId: "",
      degreeProgram: "",
      email: ""
    });
  };

  // Navigate back to previous page
  const handleBack = () => {
    navigate('/Students');
  };

  return (
    <div className="delete-student-page">
      {/* Header */}
      

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
                <label className="filter-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={filters.lastName}
                  onChange={handleFilterChange}
                  className="filter-input"
                  placeholder="Enter last name"
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
          <div className="student-details-section">
            <h3 className="section-title">Student Information</h3>
            <div className="student-details">
              <div className="student-profile">
                <img src={studentIcon} alt="Student" className="student-icon" />
              </div>
              
              <div className="student-info">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-text">{selectedStudent.name}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Student ID:</span>
                  <span className="info-text">{selectedStudent.studentId}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Program:</span>
                  <span className="info-text">{selectedStudent.degreeProgram}</span>
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