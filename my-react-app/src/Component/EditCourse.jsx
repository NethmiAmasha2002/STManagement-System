// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import courseIcon from '../images/Edit.png';

// function EditCourse() {
//   const navigate = useNavigate();
  
//   // Search filters state
//   const [filters, setFilters] = useState({
//     degreeProgram: "",
//     courseModule: "",
//     moduleId: ""
//   });

//   // Selected course state
//   const [selectedCourse, setSelectedCourse] = useState({
//     courseModule: "Operating Systems",
//     moduleId: "CS2050",
//     degreeProgram: "BSc (Hons) in Software Engineering"
//   });

//   // Notification state
//   const [notification, setNotification] = useState({
//     show: false,
//     message: "",
//     type: ""
//   });

//   // Handle filter input changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   // Handle filter submission
//   const handleFilter = (e) => {
//     e.preventDefault();
//     console.log("Filtering with:", filters);
//     // In a real app, this would search for matching courses
//   };

//   // Handle add new course
//   // const handleAdd = () => {
//   //   console.log("Adding new course with filters:", filters);
//   //   // Show success notification
//   //   setNotification({
//   //     show: true,
//   //     message: "Course added successfully!",
//   //     type: "success"
//   //   });
    
//   //   // Clear notification after 3 seconds
//   //   setTimeout(() => {
//   //     setNotification({
//   //       show: false,
//   //       message: "",
//   //       type: ""
//   //     });
//   //   }, 3000);
//   // };

//   // Handle course removal
//   const handleRemove = () => {
//     console.log("Removing course:", selectedCourse);
//     // Show notification
//     setNotification({
//       show: true,
//       message: "Course removed successfully!",
//       type: "success"
//     });
    
//     // Clear notification after 3 seconds
//     setTimeout(() => {
//       setNotification({
//         show: false,
//         message: "",
//         type: ""
//       });
//     }, 3000);
    
//     // Clear selected course
//     setSelectedCourse({
//       courseModule: "",
//       moduleId: "",
//       degreeProgram: ""
//     });
//   };

//   // Navigate back to previous page
//   const handleBack = () => {
//     navigate('/Dashboard');
//   };

//   return (
//     <div className="edit-course-page">
//       {/* Header */}
     

//       <div className="edit-course-container">
//         <div className="edit-course-content">
//           <div className="edit-course-layout">
//             {/* Left Section - Search Filters */}
//             <div className="course-filters-section">
//               <h3 className="section-title">Course Management</h3>
              
//               <div className="filter-form">

//                 <div className="filter-group">
//                   <label className="filter-label">Course Module</label>
//                   <input
//                     type="text"
//                     name="courseModule"
//                     value={filters.courseModule}
//                     onChange={handleFilterChange}
//                     className="filter-input"
//                     placeholder="Enter module name"
//                   />
//                 </div>

//                 <div className="filter-group">
//                   <label className="filter-label">Module ID</label>
//                   <input
//                     type="text"
//                     name="moduleId"
//                     value={filters.moduleId}
//                     onChange={handleFilterChange}
//                     className="filter-input"
//                     placeholder="Enter module ID"
//                   />
//                 </div>

//                 <div className="filter-buttons">
//                   <button className="filter-button" onClick={handleFilter}>
//                     <i className="fas fa-search"></i> Filter
//                   </button>
//                   {/* <button className="add-button" onClick={handleAdd}>
//                     <i className="fas fa-plus"></i> ADD
//                   </button> */}
//                 </div>
//               </div>
//             </div>

//             {/* Right Section - Course Details */}
//             <div className="course-details-section">
//               <h3 className="section-title">Selected Course</h3>
              
//               <div className="course-card">
//                 <div className="course-header">
//                   <img src={courseIcon} alt="Course" className="course-icon" />
//                 </div>
                
//                 <div className="course-body">
//                   <div className="course-info-item">
//                     <h4 className="course-info-title">{selectedCourse.courseModule}</h4>
//                   </div>
                  
//                   <div className="course-info-item">
//                     <span className="course-code">{selectedCourse.moduleId}</span>
//                   </div>
                  
//                   <div className="course-info-item">
//                     <span className="course-program">{selectedCourse.degreeProgram}</span>
//                   </div>
//                 </div>
                
//                 <div className="course-footer">
//                   <button className="remove-button" onClick={handleRemove}>
//                     <i className="fas fa-trash-alt"></i> Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Notification */}
//       {notification.show && (
//         <div className={`notification ${notification.type}`}>
//           {notification.message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default EditCourse;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, ref, child, remove } from "firebase/database";
import { database } from "../firebase"; // Adjust the import to your Firebase configuration
import "../App.css";
import courseIcon from '../images/Edit.png';
import { query, orderByChild, equalTo } from "firebase/database";

function EditCourse() {
  const navigate = useNavigate();
  
  // Search filters state
  const [filters, setFilters] = useState({
    degreeProgram: "",
    courseModule: "",
    moduleId: ""
  });

  // Selected course state
  const [selectedCourse, setSelectedCourse] = useState(null); // No default course selected initially

  const [noCourseFound, setNoCourseFound] = useState(false);

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: ""
  });

  useEffect(() => {
    console.log("🟢 Updated selectedCourse:", selectedCourse);
  }, [selectedCourse]);
  

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle filter submission to check Firebase for course existence
  // const handleFilter = async (e) => {
  //   e.preventDefault();
  //   setNoCourseFound(false);  
    
  //   try {
  //     const courseRef = ref(database, "Courses"); // Assuming courses are stored under "Courses" node
      
  //     // First check by moduleId
  //     let courseSnapshot = await get(child(courseRef, filters.moduleId));
  //     let courseData = null;

  //     if (courseSnapshot.exists()) {
  //       courseData = courseSnapshot.val(); // Course found by moduleId
  //     } else {
  //       // If not found by moduleId, check by courseModule name
  //       const allCoursesSnapshot = await get(courseRef);
  //       if (allCoursesSnapshot.exists()) {
  //         const courses = allCoursesSnapshot.val();
  //         // Find course by courseModule name
  //         const matchedCourse = Object.entries(courses).find(([id, course]) => course.courseModule === filters.courseModule);
  //         if (matchedCourse) {
  //           courseData = matchedCourse[1]; // Course found by courseModule
  //         }
  //       }
  //     }

  //     if (courseData) {
  //       setSelectedCourse({
  //         moduleId: filters.moduleId || Object.keys(courseData)[0], // If moduleId is available, use it
  //         ...courseData
  //       });
  //       setNotification({
  //         show: true,
  //         message: "Course found!",
  //         type: "success"
  //       });
  //     } else {
  //       setNotification({
  //         show: true,
  //         message: "Course not found, you can add a new course.",
  //         type: "error"
  //       });
  //       setSelectedCourse(null);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching course:", error);
  //     setNotification({
  //       show: true,
  //       message: "Error searching for course",
  //       type: "error"
  //     });
  //   }
  // };

  // const handleFilter = async (e) => {
  //   e.preventDefault();
  //   setNoCourseFound(false); // Reset the no course found state before filtering

  //   try {
  //     const courseRef = ref(database, "Courses"); // Assuming courses are stored under "Courses" node

  //     let courseSnapshot = await get(child(courseRef, filters.moduleId));
  //     let courseData = null;

  //     if (courseSnapshot.exists()) {
  //       courseData = courseSnapshot.val(); // Course found by moduleId
  //     } else {
  //       // If not found by moduleId, check by courseModule name
  //       const allCoursesSnapshot = await get(courseRef);
  //       if (allCoursesSnapshot.exists()) {
  //         const courses = allCoursesSnapshot.val();
  //         // Find course by courseModule name
  //         const matchedCourse = Object.entries(courses).find(([id, course]) => course.courseModule === filters.courseModule);
  //         if (matchedCourse) {
  //           courseData = matchedCourse[1]; // Course found by courseModule
  //         }
  //       }
  //     }

  //     if (courseData) {
  //       setSelectedCourse({
  //         moduleId: filters.moduleId || Object.keys(courseData)[0], // If moduleId is available, use it
  //         ...courseData
  //       });
  //       setNotification({
  //         show: true,
  //         message: "Course found!",
  //         type: "success"
  //       });
  //     } else {
  //       setSelectedCourse(null); // Clear selected course if no match is found
  //       setNoCourseFound(true); // Set state to show "Add Course" button
  //       setNotification({
  //         show: true,
  //         message: "Course not found, you can add a new course.",
  //         type: "error"
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching course:", error);
  //     setNotification({
  //       show: true,
  //       message: "Error searching for course",
  //       type: "error"
  //     });
  //   }
  // };


  const handleFilter = async (e) => {
    e.preventDefault();
    setNoCourseFound(false); // Reset the "no course found" state
  
    try {
      const courseRef = ref(database, "Courses"); // Reference to "Courses" node
      let courseData = null;
  
      console.log(" Searching for course...");
  
      // First, try searching by moduleId
      if (filters.moduleId) {
        console.log(` Searching by Module ID: ${filters.moduleId}`);
        const courseSnapshot = await get(child(courseRef, filters.moduleId));
        if (courseSnapshot.exists()) {
          courseData = courseSnapshot.val();
          
          // Extract the first key inside if data is wrapped incorrectly
          if (typeof courseData === "object" && Object.keys(courseData).length === 1) {
            const key = Object.keys(courseData)[0]; // Get the first key
            courseData = courseData[key]; // Extract the actual data
          }
  
          console.log(" Course found by Module ID:", courseData);
        } else {
          console.log(" No course found by Module ID");
        }
      }

      //console.log("Filters:", filters);
console.log("filters.courseName:", filters.courseName);
console.log("courseData before searching by courseName:", courseData);

  
      // If not found by moduleId, try searching by courseModule name
      if (!courseData && filters.courseName) {
        console.log("test")
        console.log(` Searching by Course Module Name: ${filters.courseName}`);
        const allCoursesSnapshot = await get(courseRef);
  
        if (allCoursesSnapshot.exists()) {
          const courses = allCoursesSnapshot.val();
          console.log(" All courses retrieved:", courses);
  
          // Find the course by its courseModule name
          const matchedCourse = Object.entries(courses).find(
            ([id, course]) => course.courseName.toLowerCase() === filters.courseName.toLowerCase()
          );
  
          if (matchedCourse) {
            courseData = { moduleId: matchedCourse[0], ...matchedCourse[1] };
            console.log(" Course found by Course Module Name:", courseData);
          } else {
            console.log(" No course found by Course Module Name");
          }
        } else {
          console.log(" No courses available in the database");
        }
      }
  
      if (courseData) {
        setSelectedCourse(courseData); // Ensure it contains all course data
        setNotification({
          show: true,
          message: "Course found!",
          type: "success"
        });
      } else {
        setSelectedCourse(null); // Clear previous selection
        setNoCourseFound(true); // Enable "Add Course" button
        setNotification({
          show: true,
          message: "Course not found, you can add a new course.",
          type: "error"
        });
      }
    } catch (error) {
      console.error(" Error fetching course:", error);
      setNotification({
        show: true,
        message: "Error searching for course",
        type: "error"
      });
    }
  };

// const handleFilter = async (e) => {
//   e.preventDefault();
//   setNoCourseFound(false);

//   try {
//     const courseRef = ref(database, "Courses");
//     let courseData = null;

//     console.log("🔍 Searching for course...");

//     // Search by moduleId (direct lookup)
//     if (filters.moduleId) {
//       console.log(`📌 Searching by Module ID: ${filters.moduleId}`);
//       const courseSnapshot = await get(child(courseRef, filters.moduleId));
//       if (courseSnapshot.exists()) {
//         courseData = courseSnapshot.val();
//         console.log("✅ Course found by Module ID:", courseData);
//       } else {
//         console.log("❌ No course found by Module ID");
//       }
//     }

//     // Search by courseName (Firebase Query)
//     if (!courseData && filters.courseName) {
//       console.log(`📌 Searching by Course Name: ${filters.courseName}`);
      
//       const courseQuery = query(courseRef, orderByChild("courseName"), equalTo(filters.courseName));
//       const courseSnapshot = await get(courseQuery);

//       if (courseSnapshot.exists()) {
//         const courses = courseSnapshot.val();
//         console.log("✅ Courses found by Course Name:", courses);

//         // Extract first matching course
//         const firstCourseKey = Object.keys(courses)[0]; 
//         courseData = { moduleId: firstCourseKey, ...courses[firstCourseKey] };
//       } else {
//         console.log("❌ No course found by Course Name");
//       }
//     }

//     if (courseData) {
//       setSelectedCourse(courseData);
//       setNotification({
//         show: true,
//         message: "Course found!",
//         type: "success"
//       });
//     } else {
//       setSelectedCourse(null);
//       setNoCourseFound(true);
//       setNotification({
//         show: true,
//         message: "Course not found, you can add a new course.",
//         type: "error"
//       });
//     }
//   } catch (error) {
//     console.error("⚠️ Error fetching course:", error);
//     setNotification({
//       show: true,
//       message: "Error searching for course",
//       type: "error"
//     });
//   }
// };

  
  
  
  // Handle course removal
  const handleRemove = async () => {
    if (!selectedCourse) return;

    const confirmDelete = window.confirm(`Are you sure you want to delete the course ${selectedCourse.courseModule}?`);
    if (!confirmDelete) return;

    try {
      await remove(ref(database, `Courses/${selectedCourse.moduleId}`)); // Deleting the course by its moduleId
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
      
      setSelectedCourse(null); // Clear selected course after removal
    } catch (error) {
      console.error("Error deleting course:", error);
      setNotification({
        show: true,
        message: "Error deleting course",
        type: "error"
      });
    }
  };

  // Navigate to edit course page
  const handleEdit = () => {
    if (selectedCourse) {
      navigate(`/EditCourse/${selectedCourse.moduleId}`); // Assuming you have an edit page that takes moduleId
    }
  };

  // Navigate to add course page
  const handleAddCourse = () => {
    navigate('/AddCourse'); // Navigate to the page where the user can add a new course
  };

  // Navigate back to previous page
  const handleBack = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="edit-course-page">
      <div className="edit-course-container">
        <div className="edit-course-content">
          <div className="edit-course-layout">
            {/* Left Section - Search Filters */}
            <div className="course-filters-section">
              <h3 className="section-title">Course Management</h3>
              
              <div className="filter-form">
                <div className="filter-group">
                  <label className="filter-label">Course Module</label>
                  <input
                    type="text"
                    name="courseModule"
                    value={filters.courseName}
                    onChange={handleFilterChange}
                    className="filter-input"
                    placeholder="Enter module name"
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
                    <i className="fas fa-search"></i> Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Course Details */}
            <div className="course-details-section">
              <h3 className="section-title">Selected Course</h3>
              
              {selectedCourse ? (
                <div className="course-card">
                  <div className="course-header">
                    <img src={courseIcon} alt="Course" className="course-icon" />
                  </div>
                  
                  <div className="course-body">
                    <div className="course-info-item">
                      <h4 className="course-info-title">{selectedCourse.courseName}</h4>
                    </div>
                    
                    <div className="course-info-item">
                      <span className="course-code">{selectedCourse.moduleId}</span>
                    </div>
                    
                    <div className="course-info-item">
                      <span className="course-program">{selectedCourse.year}</span>
                    </div>
                  </div>
                  
                  <div className="course-footer">
                    <button className="remove-button" onClick={handleRemove}>
                      <i className="fas fa-trash-alt"></i> Remove
                    </button>
                    <button className="edit-button" onClick={handleEdit}>
                      <i className="fas fa-pencil-alt"></i> Edit
                    </button>
                  </div>
                </div>
              ) : noCourseFound ? (
                <div className="no-course-message">
                  <p>Course not found, you can add a new course</p>
                  <button className="add-button" onClick={handleAddCourse}>
                    <i className="fas fa-plus"></i> Add Course
                  </button>
                </div>
              ) : (
                <div className="no-course-message">
                  <p>Search a course to view or add one</p>
                </div>
              )}
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
