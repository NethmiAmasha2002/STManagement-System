// import React, { useState } from 'react';
// import { ref, set } from 'firebase/database';
// import { database } from '../firebase'; // Assuming you've already set up Firebase config

// const AddCourseForm = () => {
//   const [moduleName, setModuleName] = useState('');
//   const [moduleId, setModuleId] = useState('');
//   const [year, setYear] = useState('');
//   const [semester, setSemester] = useState('');
//   const [courseName, setCourseName] = useState('');
  
//   // List of years for selection
//   const years = [
//     { label: 'First Year', value: '1', semesters: ['Semester 1', 'Semester 2'] },
//     { label: 'Second Year', value: '2', semesters: ['Semester 3', 'Semester 4'] },
//     { label: 'Third Year', value: '3', semesters: ['Semester 5', 'Semester 6'] },
//     { label: 'Fourth Year', value: '4', semesters: ['Semester 7', 'Semester 8'] }
//   ];

//     // Handle year change
//     const handleYearChange = (e) => {
//         setYear(e.target.value);
//         setSemester(''); // Reset semester when year changes
//       };
    
//       // Find the selected year's semesters based on the value
//       const selectedYear = years.find((yearOption) => yearOption.value === year);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (moduleName && moduleId && year && courseName) {
//       try {
//         // Create a new course object
//         const newCourse = {
//           courseName,
//           moduleName,
//           year,
//           semester
//         };

//         // Set the course data in Firebase under the courses node
//         const courseRef = ref(database, `Courses/${moduleId}`);
//         await set(courseRef, {
//           [courseName]: newCourse,
//         });

//         alert('Course added successfully!');
//         // Clear the form
//         setCourseName('');
//         setModuleName('');
//         setModuleId('');
//         setYear('');
//       } catch (error) {
//         console.error("Error adding course:", error);
//         alert('Failed to add course. Please try again.');
//       }
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   return (
//     <div className="add-course-form">
//       <h2>Add New Course</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Course Name</label>
//           <input
//             type="text"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Module Name</label>
//           <input
//             type="text"
//             value={moduleName}
//             onChange={(e) => setModuleName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Module ID</label>
//           <input
//             type="text"
//             value={moduleId}
//             onChange={(e) => setModuleId(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Year</label>
//           <select value={year} onChange={handleYearChange} required>
//             <option value="">Select Year</option>
//             {years.map((yearOption) => (
//               <option key={yearOption.value} value={yearOption.value}>
//                 {yearOption.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {year && (
//           <div>
//             <label>Semester</label>
//             <select value={semester} onChange={(e) => setSemester(e.target.value)} required>
//               <option value="">Select Semester</option>
//               {selectedYear?.semesters.map((semesterOption, index) => (
//                 <option key={index} value={semesterOption}>
//                   {semesterOption}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         <button type="submit">Add Course</button>
//       </form>
//     </div>
//   );
// };

// export default AddCourseForm;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import courseIcon from '../images/Edit.png';
// import { ref, set } from 'firebase/database';
// import { database } from '../firebase'; // Assuming you've already set up Firebase config

// function AddCourseForm() {
//   const navigate = useNavigate();
  
//   const [moduleName, setModuleName] = useState('');
//   const [moduleId, setModuleId] = useState('');
//   const [year, setYear] = useState('');
//   const [semester, setSemester] = useState('');
//   const [courseName, setCourseName] = useState('');
  
//   // List of years for selection
//   const years = [
//     { label: 'First Year', value: '1', semesters: ['Semester 1', 'Semester 2'] },
//     { label: 'Second Year', value: '2', semesters: ['Semester 3', 'Semester 4'] },
//     { label: 'Third Year', value: '3', semesters: ['Semester 5', 'Semester 6'] },
//     { label: 'Fourth Year', value: '4', semesters: ['Semester 7', 'Semester 8'] }
//   ];

//     // Handle year change
//     const handleYearChange = (e) => {
//         setYear(e.target.value);
//         setSemester(''); // Reset semester when year changes
//       };
    
//       // Find the selected year's semesters based on the value
//       const selectedYear = years.find((yearOption) => yearOption.value === year);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (moduleName && moduleId && year && courseName) {
//       try {
//         // Create a new course object
//         const newCourse = {
//           courseName,
//           moduleName,
//           year,
//           semester
//         };

//         // Set the course data in Firebase under the courses node
//         const courseRef = ref(database, `Courses/${moduleId}`);
//         await set(courseRef, {
//           [courseName]: newCourse,
//         });

//         alert('Course added successfully!');
//         // Clear the form
//         setCourseName('');
//         setModuleName('');
//         setModuleId('');
//         setYear('');
//       } catch (error) {
//         console.error("Error adding course:", error);
//         alert('Failed to add course. Please try again.');
//       }
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

 

  

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
//   const handleAdd = () => {
//     console.log("Adding new course with filters:", filters);
//     // Show success notification
//     setNotification({
//       show: true,
//       message: "Course added successfully!",
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
//                     name="courseName"
//                     value={courseName}
//                     onChange={(e) => setCourseName(e.target.value)}
//                     className="filter-input"
//                     placeholder="Enter module name"
//                     required
//                 />
//                 </div>

//                 <div className="filter-group">
//                   <label className="filter-label">Module ID</label>
//                   <input
//                     type="text"
//                     name="moduleId"
//                     value={moduleId}
//                     onChange={(e) => setModuleId(e.target.value)}
//                     className="filter-input"
//                     placeholder="Enter module ID"
//                     required
//                 />
//                 </div>

//                 <div>
//                 <label>Year</label>
//                 <select value={year} onChange={(e) => setYear(e.target.value)} required>
//                     <option value="">Select Year</option>
//                     {years.map((yearOption) => (
//                     <option key={yearOption} value={yearOption}>
//                         {yearOption}
//                     </option>
//                     ))}
//                 </select>
//                 </div>

//                 <div>
//                 <label>Semester</label>
//                 <select value={year} onChange={(e) => setSemester(e.target.value)} required>
//                     <option value="">Select Semester</option>
//                     {years.map((yearOption) => (
//                     <option key={yearOption} value={yearOption}>
//                         {yearOption}
//                     </option>
//                     ))}
//                 </select>
//                 </div>

//                 <div className="filter-buttons">
//                   {/* <button className="filter-button" onClick={handleFilter}>
//                     <i className="fas fa-search"></i> Filter
//                   </button> */}
//                   <button className="add-button" onClick={handleAdd}>
//                     <i className="fas fa-plus"></i> ADD
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
// };

// export default AddCourseForm;


// import React, { useState } from 'react';
// import { ref, set } from 'firebase/database';
// import { database } from '../firebase';
// import "../App.css";

// const AddCourseForm = () => {
//   const [moduleName, setModuleName] = useState('');
//   const [moduleId, setModuleId] = useState('');
//   const [year, setYear] = useState('1'); // Default to first year
//  const [semester, setSemester] = useState('Semester 1'); // Default to Semester 1
//   const [courseName, setCourseName] = useState('');
  
//   const years = [
//     { label: 'First Year', value: '1', semesters: ['Semester 1', 'Semester 2'] },
//     { label: 'Second Year', value: '2', semesters: ['Semester 3', 'Semester 4'] },
//     { label: 'Third Year', value: '3', semesters: ['Semester 5', 'Semester 6'] },
//     { label: 'Fourth Year', value: '4', semesters: ['Semester 7', 'Semester 8'] }
//   ];

// const handleYearChange = (e) => {
//     const selectedYear = e.target.value;
//     setYear(selectedYear);
  
//     // Get the first semester of the selected year
//     const defaultSemester = years.find(y => y.value === selectedYear)?.semesters[0] || '';
//     setSemester(defaultSemester);
//   };

//   const selectedYear = years.find((yearOption) => yearOption.value === year);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (moduleName && moduleId && year && courseName) {
//       try {
//         const newCourse = { courseName, moduleName, year, semester };
//         const courseRef = ref(database, `Courses/${moduleId}`);
//         await set(courseRef, { [courseName]: newCourse });
//         alert('Course added successfully!');
//         setCourseName('');
//         setModuleName('');
//         setModuleId('');
//         setYear('');
//       } catch (error) {
//         console.error("Error adding course:", error);
//         alert('Failed to add course. Please try again.');
//       }
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   return (
//     <div className="edit-course-page">
//       <div className="edit-course-container">
//         <div className="edit-course-content">
//           <h2 className="section-title">Add New Course</h2>
//           <form onSubmit={handleSubmit} className="filter-form">
//             <div className="filter-group">
//               <label className="filter-label">Course Name</label>
//               <input
//                 type="text"
//                 value={courseName}
//                 onChange={(e) => setCourseName(e.target.value)}
//                 className="filter-input"
//                 required
//               />
//             </div>
//             <div className="filter-group">
//               <label className="filter-label">Module Name</label>
//               <input
//                 type="text"
//                 value={moduleName}
//                 onChange={(e) => setModuleName(e.target.value)}
//                 className="filter-input"
//                 required
//               />
//             </div>
//             <div className="filter-group">
//               <label className="filter-label">Module ID</label>
//               <input
//                 type="text"
//                 value={moduleId}
//                 onChange={(e) => setModuleId(e.target.value)}
//                 className="filter-input"
//                 required
//               />
//             </div>
//             <div className="filter-group">
//             <label className="filter-label">Year</label>
//             <select value={year} onChange={handleYearChange} className="filter-input" required>
//                 {years.map((yearOption) => (
//                 <option key={yearOption.value} value={yearOption.value}>
//                     {yearOption.label}
//                 </option>
//                 ))}
//             </select>
//             </div>

//             <div className="filter-group">
//             <label className="filter-label">Semester</label>
//             <select value={semester} onChange={(e) => setSemester(e.target.value)} className="filter-input" required>
//                 {selectedYear?.semesters.map((semesterOption, index) => (
//                 <option key={index} value={semesterOption}>
//                     {semesterOption}
//                 </option>
//                 ))}
//             </select>
//             </div>
//             <div className="filter-buttons">
//               <button type="submit" className="filter-button">Add Course</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourseForm;
























// import React, { useState } from 'react';
// import { ref, set } from 'firebase/database';
// import { database } from '../firebase';
// import "../App.css";

// const AddCourseForm = () => {
//   const [moduleId, setModuleId] = useState('');
//   const [year, setYear] = useState('1'); // Default to first year
//   const [semester, setSemester] = useState('Semester 1'); // Default to Semester 1
//   const [courseName, setCourseName] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
//   const years = [
//     { label: 'First Year', value: '1', semesters: ['Semester 1', 'Semester 2'] },
//     { label: 'Second Year', value: '2', semesters: ['Semester 3', 'Semester 4'] },
//     { label: 'Third Year', value: '3', semesters: ['Semester 5', 'Semester 6'] },
//     { label: 'Fourth Year', value: '4', semesters: ['Semester 7', 'Semester 8'] }
//   ];

//   const handleYearChange = (e) => {
//     const selectedYear = e.target.value;
//     setYear(selectedYear);
  
//     // Get the first semester of the selected year
//     const defaultSemester = years.find(y => y.value === selectedYear)?.semesters[0] || '';
//     setSemester(defaultSemester);
//   };

//   const selectedYear = years.find((yearOption) => yearOption.value === year);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (moduleId && year && courseName) {
//       try {
//         const newCourse = { courseName, year, semester };
//         const courseRef = ref(database, `Courses/${moduleId}`);
//         await set(courseRef, { [courseName]: newCourse });
        
//         // Show success notification
//         setNotification({
//           show: true,
//           message: 'Course added successfully!',
//           type: 'success'
//         });
        
//         // Clear form
//         setCourseName('');
//         setModuleId('');
//         setYear('1');
//         setSemester('Semester 1');
        
//         // Hide notification after 3 seconds
//         setTimeout(() => {
//           setNotification({ show: false, message: '', type: '' });
//         }, 3000);
//       } catch (error) {
//         console.error("Error adding course:", error);
//         setNotification({
//           show: true,
//           message: 'Failed to add course. Please try again.',
//           type: 'error'
//         });
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       setNotification({
//         show: true,
//         message: 'Please fill in all required fields.',
//         type: 'error'
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="add-course-page">
//       <div className="add-course-container">
//         <div className="add-course-content">
//           <h2 className="add-course-title">Add New Course</h2>
          
//           <form onSubmit={handleSubmit} className="add-course-form">
//             <div className="form-group">
//               <label className="form-label">Course Name</label>
//               <input
//                 type="text"
//                 value={courseName}
//                 onChange={(e) => setCourseName(e.target.value)}
//                 className="form-input"
//                 placeholder="Enter course name"
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label className="form-label">Module ID</label>
//               <input
//                 type="text"
//                 value={moduleId}
//                 onChange={(e) => setModuleId(e.target.value)}
//                 className="form-input"
//                 placeholder="Enter module ID (e.g. CS2050)"
//                 required
//               />
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label">Year</label>
//                 <select 
//                   value={year} 
//                   onChange={handleYearChange} 
//                   className="form-select"
//                   required
//                 >
//                   {years.map((yearOption) => (
//                     <option key={yearOption.value} value={yearOption.value}>
//                       {yearOption.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Semester</label>
//                 <select 
//                   value={semester} 
//                   onChange={(e) => setSemester(e.target.value)} 
//                   className="form-select"
//                   required
//                 >
//                   {selectedYear?.semesters.map((semesterOption, index) => (
//                     <option key={index} value={semesterOption}>
//                       {semesterOption}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
            
//             <div className="form-actions">
//               <button 
//                 type="submit" 
//                 className="add-course-button"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Adding Course...' : 'Add Course'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
      
//       {notification.show && (
//         <div className={`notification ${notification.type}`}>
//           {notification.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddCourseForm;






import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';
import "../App.css";
import teachingIcon from '../images/add.jpg'; // Update path as needed

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
        const newCourse = { courseName, year, semester };
        const courseRef = ref(database, `Courses/${moduleId}`);
        await set(courseRef, { [courseName]: newCourse });
        
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