// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// // Course images - update paths as needed
// import aiImage from '../images/AI.jpeg';
// import roboticsImage from '../images/Robotics.jpeg';
// import oopImage from '../images/OOP.jpeg';
// import osImage from '../images/OS.jpeg';

// // Course data
// const courseModules = [
//   {
//     id: 1,
//     name: "Artificial Intelligence",
//     image: aiImage,
//     selected: false
//   },
//   {
//     id: 2,
//     name: "Robotics",
//     image: roboticsImage,
//     selected: false
//   },
//   {
//     id: 3,
//     name: "OOP Basic",
//     image: oopImage,
//     selected: false
//   },
//   {
//     id: 4,
//     name: "Operating System",
//     image: osImage,
//     selected: false
//   }
// ];

// function CourseDetails() {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState(courseModules);
  
//   // Toggle course selection
//   const toggleCourseSelection = (id) => {
//     // Update selected status for the clicked course
//     setCourses(courses.map(course => 
//       course.id === id ? {...course, selected: !course.selected} : course
//     ));
//   };
  
//   // Handle add course button - navigate to EditCourse
//   const handleAddCourse = () => {
//     // Navigate to EditCourse without requiring a selection
//     navigate('/EditCourse');
//   };

//   return (
//     <div className="course-details-page">
//       {/* Header */}
      

//       <div className="course-details-container">
//         {/* Course Modules Title */}
//         <h2 className="course-section-title">Course Modules</h2>
        
//         {/* Course Grid */}
//         <div className="courses-grid">
//           {courses.map(course => (
//             <div 
//               key={course.id} 
//               className={`course-module-card ${course.selected ? 'selected' : ''}`}
//               onClick={() => toggleCourseSelection(course.id)}
//             >
//               <div className="course-image-container">
//                 <img 
//                   src={course.image} 
//                   alt={course.name} 
//                   className="course-module-image"
//                 />
//               </div>
//               <div 
//                 className={`course-module-button ${course.selected ? 'selected' : ''}`}
//               >
//                 {course.name}
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Add Button */}
//         <div className="add-button-container">
//           <button className="add-large-button" onClick={handleAddCourse}>
//             ADD
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseDetails;










import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Course images - update paths as needed
import aiImage from '../images/AI.jpeg';
import roboticsImage from '../images/Robotics.jpeg';
import oopImage from '../images/OOP.jpeg';
import osImage from '../images/OS.jpeg';

// Expanded course data with semester and intake information
const courseModulesData = [
  {
    id: 1,
    name: "Artificial Intelligence",
    image: aiImage,
    selected: false,
    semester: "Semester 1",
    intake: "Intake 40",
    moduleId: "CS3050"
  },
  {
    id: 2,
    name: "Robotics",
    image: roboticsImage,
    selected: false,
    semester: "Semester 2",
    intake: "Intake 40",
    moduleId: "CS3060"
  },
  {
    id: 3,
    name: "OOP Basic",
    image: oopImage,
    selected: false,
    semester: "Semester 1",
    intake: "Intake 41",
    moduleId: "CS1040"
  },
  {
    id: 4,
    name: "Operating System",
    image: osImage,
    selected: false,
    semester: "Semester 2",
    intake: "Intake 41",
    moduleId: "CS2050"
  },
  {
    id: 5,
    name: "Database Systems",
    image: aiImage, // Replace with appropriate image
    selected: false,
    semester: "Semester 3",
    intake: "Intake 39",
    moduleId: "CS3010"
  },
  {
    id: 6,
    name: "Web Development",
    image: roboticsImage, // Replace with appropriate image
    selected: false,
    semester: "Semester 4",
    intake: "Intake 39",
    moduleId: "CS3080"
  }
];

function CourseDetails() {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState(courseModulesData);
  const [filteredCourses, setFilteredCourses] = useState(courseModulesData);
  
  // Filter states
  const [filters, setFilters] = useState({
    semester: "",
    intake: "",
    searchQuery: ""
  });

  // Toggle course selection
  const toggleCourseSelection = (id) => {
    // Update selected status for the clicked course
    const updatedCourses = allCourses.map(course => 
      course.id === id ? {...course, selected: !course.selected} : course
    );
    setAllCourses(updatedCourses);
    
    // Apply current filters to the updated courses
    applyFilters(updatedCourses);
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
  };

  // Apply filters
  const applyFilters = (courses = allCourses) => {
    let result = [...courses];
    
    // Filter by semester if selected
    if (filters.semester) {
      result = result.filter(course => course.semester === filters.semester);
    }
    
    // Filter by intake if selected
    if (filters.intake) {
      result = result.filter(course => course.intake === filters.intake);
    }
    
    // Filter by search query if provided
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(course => 
        course.name.toLowerCase().includes(query) ||
        course.moduleId.toLowerCase().includes(query)
      );
    }
    
    setFilteredCourses(result);
  };

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      semester: "",
      intake: "",
      searchQuery: ""
    });
    setFilteredCourses(allCourses);
  };
  
  // Handle add course button - navigate to EditCourse
  const handleAddCourse = () => {
    // Navigate to EditCourse without requiring a selection
    navigate('/EditCourse');
  };

  // Apply filters when filters change
  useEffect(() => {
    // Only apply filters automatically when dropdown selections change
    if (filters.semester || filters.intake) {
      applyFilters();
    }
  }, [filters.semester, filters.intake]);

  return (
    <div className="course-details-page">
      <div className="course-details-container">
        {/* Search and Filter Section */}
        <div className="course-filter-section">
          <h2 className="course-section-title">Course Modules</h2>
          
          <form className="course-search-form" onSubmit={handleSearch}>
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="semester">Semester</label>
                <select 
                  id="semester"
                  name="semester"
                  value={filters.semester}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All Semesters</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="intake">Intake</label>
                <select 
                  id="intake"
                  name="intake"
                  value={filters.intake}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All Intakes</option>
                  <option value="Intake 39">Intake 39</option>
                  <option value="Intake 40">Intake 40</option>
                  <option value="Intake 41">Intake 41</option>
                  <option value="Intake 42">Intake 42</option>
                </select>
              </div>
              
              <div className="filter-group search-group">
                <label htmlFor="searchQuery">Search Modules</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    id="searchQuery"
                    name="searchQuery"
                    value={filters.searchQuery}
                    onChange={handleFilterChange}
                    placeholder="Search by name or ID"
                    className="search-input"
                  />
                  <button type="submit" className="search-button">Search</button>
                </div>
              </div>
              
              <div className="filter-actions">
                <button 
                  type="button" 
                  className="reset-button" 
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Course Grid */}
        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
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
                <div className="course-module-details">
                  <span className="course-module-id">{course.moduleId}</span>
                  <span className="course-module-semester">{course.semester}</span>
                  <span className="course-module-intake">{course.intake}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-courses-message">
              No courses found matching the selected filters.
            </div>
          )}
        </div>
        
        {/* Add Button */}
        <div className="add-button-container">
          <button className="add-large-button" onClick={handleAddCourse}>
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;