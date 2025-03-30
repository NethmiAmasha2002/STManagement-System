import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import courseIcon from '../images/Edit.png';

function EditCourse() {
  const navigate = useNavigate();
  
  // Search filters state
  const [filters, setFilters] = useState({
    semester: "",
    intake: "",
    courseModule: "",
    moduleId: ""
  });

  // Selected course state
  const [selectedCourse, setSelectedCourse] = useState({
    courseModule: "Operating Systems",
    moduleId: "CS2050",
    semester: "Semester 2",
    intake: "Intake 41"
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
    // In a real app, this would search for matching courses
  };

  // Handle add new course
  const handleAdd = () => {
    console.log("Adding new course with filters:", filters);
    // Show success notification
    setNotification({
      show: true,
      message: "Course added successfully!",
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
  };

  // Handle course removal
  const handleRemove = () => {
    console.log("Removing course:", selectedCourse);
    // Show notification
    setNotification({
      show: true,
      message: "Course removed successfully!",
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
    
    // Clear selected course
    setSelectedCourse({
      courseModule: "",
      moduleId: "",
      semester: "",
      intake: ""
    });
  };

  // Navigate back to previous page
  const handleBack = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="edit-course-page">
      {/* Header */}
     
      <div className="edit-course-container">
        <div className="edit-course-content">
          <div className="edit-course-layout">
            {/* Left Section - Search Filters */}
            <div className="course-filters-section">
              <h3 className="section-title">Course Management</h3>
              
              <div className="filter-form">
                <div className="filter-group">
                  <label className="filter-label">Semester</label>
                  <select
                    name="semester"
                    value={filters.semester}
                    onChange={handleFilterChange}
                    className="filter-input"
                  >
                    <option value="">Select Semester</option>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Intake</label>
                  <select
                    name="intake"
                    value={filters.intake}
                    onChange={handleFilterChange}
                    className="filter-input"
                  >
                    <option value="">Select Intake</option>
                    <option value="Intake 39">Intake 39</option>
                    <option value="Intake 40">Intake 40</option>
                    <option value="Intake 41">Intake 41</option>
                    <option value="Intake 42">Intake 42</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Course Module</label>
                  <input
                    type="text"
                    name="courseModule"
                    value={filters.courseModule}
                    onChange={handleFilterChange}
                    className="filter-input"
                    placeholder="Enter course module"
                  />
                </div>

                <div className="filter-group">
                  <label className="filter-label">Module ID</label>
                  <input
                    type="text"
                    name="moduleId"
                    value={filters.moduleId}
                    onChange={handleFilterChange}
                    className="filter-input"
                    placeholder="Enter module ID"
                  />
                </div>

                <div className="filter-buttons">
                  <button className="filter-button" onClick={handleFilter}>
                    Filter
                  </button>
                  <button className="add-button" onClick={handleAdd}>
                    ADD
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Course Details */}
            <div className="course-details-section">
              <h3 className="section-title">Selected Course</h3>
              
              <div className="course-card">
                {selectedCourse.courseModule ? (
                  <>
                    <div className="course-header">
                      <img src={courseIcon} alt="Course" className="course-icon" />
                    </div>
                    
                    <div className="course-body">
                      <div className="course-info-item">
                        <h4 className="course-info-title">{selectedCourse.courseModule}</h4>
                      </div>
                      
                      <div className="course-info-item">
                        <span className="course-code">{selectedCourse.moduleId}</span>
                      </div>
                      
                      <div className="course-info-item">
                        <span className="course-semester">{selectedCourse.semester}</span>
                      </div>
                      
                      <div className="course-info-item">
                        <span className="course-intake">{selectedCourse.intake}</span>
                      </div>
                    </div>
                    
                    <div className="course-footer">
                      <button className="remove-button" onClick={handleRemove}>
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="no-course-selected">
                    <p>No course selected</p>
                  </div>
                )}
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

export default EditCourse;