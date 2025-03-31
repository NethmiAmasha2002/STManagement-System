import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Course images - update paths as needed
import aiImage from '../images/AI.jpeg';
import roboticsImage from '../images/Robotics.jpeg';
import oopImage from '../images/OOP.jpeg';
import osImage from '../images/OS.jpeg';

// Course data
const courseModules = [
  {
    id: 1,
    name: "Artificial Intelligence",
    image: aiImage,
    selected: false
  },
  {
    id: 2,
    name: "Robotics",
    image: roboticsImage,
    selected: false
  },
  {
    id: 3,
    name: "OOP Basic",
    image: oopImage,
    selected: false
  },
  {
    id: 4,
    name: "Operating System",
    image: osImage,
    selected: false
  }
];

function CourseDetails() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(courseModules);
  
  // Toggle course selection
  const toggleCourseSelection = (id) => {
    // Update selected status for the clicked course
    setCourses(courses.map(course => 
      course.id === id ? {...course, selected: !course.selected} : course
    ));
  };
  
  // Handle add course button - navigate to EditCourse
  const handleAddCourse = () => {
    // Navigate to EditCourse without requiring a selection
    navigate('/EditCourse');
  };

  return (
    <div className="course-details-page">
      {/* Header */}
      

      <div className="course-details-container">
        {/* Course Modules Title */}
        <h2 className="course-section-title">Course Modules</h2>
        
        {/* Course Grid */}
        <div className="courses-grid">
          {courses.map(course => (
            <div 
              key={course.id} 
              className={`course-module-card ${course.selected ? 'selected' : ''}`}
              onClick={() => toggleCourseSelection(course.id)}
            >
              <div className="course-image-container">
                <img 
                  src={course.image} 
                  alt={course.name} 
                  className="course-module-image"
                />
              </div>
              <div 
                className={`course-module-button ${course.selected ? 'selected' : ''}`}
              >
                {course.name}
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Button */}
        <div className="add-button-container">
          <button className="add-large-button" onClick={handleAddCourse}>
            View Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;