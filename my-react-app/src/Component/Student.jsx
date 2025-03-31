// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../App.css";
// // import studentIcon from '../images/ST.jpeg'; // Update with your actual icon path

// // // Sample student data - replace with your actual data source
// // const sampleStudents = [
// //   {
// //     id: 1,
// //     name: "John Doe",
// //     studentId: "KDU001",
// //     program: "BSc in Software Engineering",
// //     year: "3rd Year",
// //     email: "john.doe@kdu.ac.lk",
// //   },
// //   {
// //     id: 2,
// //     name: "Sarah Johnson",
// //     studentId: "KDU002",
// //     program: "BSc in Computer Science",
// //     year: "2nd Year",
// //     email: "sarah.johnson@kdu.ac.lk",
// //   },
// //   {
// //     id: 3,
// //     name: "Michael Smith",
// //     studentId: "KDU003",
// //     program: "BSc in Information Technology",
// //     year: "4th Year",
// //     email: "michael.smith@kdu.ac.lk",
// //   },
// //   {
// //     id: 4,
// //     name: "Emily Wang",
// //     studentId: "KDU004",
// //     program: "BSc in Software Engineering",
// //     year: "1st Year",
// //     email: "emily.wang@kdu.ac.lk",
// //   },
// //   {
// //     id: 5,
// //     name: "David Brown",
// //     studentId: "KDU005",
// //     program: "BSc in Computer Science",
// //     year: "3rd Year",
// //     email: "david.brown@kdu.ac.lk",
// //   },
// //   {
// //     id: 6,
// //     name: "Lisa Anderson",
// //     studentId: "KDU006",
// //     program: "BSc in Information Technology",
// //     year: "2nd Year",
// //     email: "lisa.anderson@kdu.ac.lk",
// //   },
// // ];

// // function Students() {
// //   const navigate = useNavigate();
// //   const [students, setStudents] = useState(sampleStudents);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filteredStudents, setFilteredStudents] = useState(sampleStudents);

// //   // Effect to filter students based on search term
// //   useEffect(() => {
// //     if (searchTerm.trim() === "") {
// //       setFilteredStudents(students);
// //     } else {
// //       const filtered = students.filter(
// //         student =>
// //           student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           student.program.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //       setFilteredStudents(filtered);
// //     }
// //   }, [searchTerm, students]);

// //   // Handle search input changes
// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   // Navigate to add student page
// //   const handleAddStudent = () => {
// //     navigate('/AddStudent');
// //   };

// //   // Navigate to student details page
// //   const handleStudentClick = (student) => {
// //     navigate(`/StudentDetails/${student.id}`, { state: { student } });
// //   };

// //   // Handle logout
// //   const handleLogout = () => {
// //     // Implement logout logic here
// //     navigate('/Login');
// //   };

// //   return (
// //     <div className="students-page">
// //       {/* Header */}
      

// //       <div className="students-container">
// //         <div className="students-controls">
// //           <h2 className="page-title">Student Management</h2>
          
// //           <div className="controls-row">
// //             <div className="search-container">
// //               <i className="fas fa-search search-icon"></i>
// //               <input
// //                 type="text"
// //                 placeholder="Search students..."
// //                 value={searchTerm}
// //                 onChange={handleSearchChange}
// //                 className="search-input"
// //               />
// //             </div>
            
// //             <button className="logout-button" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>

// //         {/* Students Grid */}
// //         <div className="students-grid">
// //           {filteredStudents.length > 0 ? (
// //             filteredStudents.map(student => (
// //               <div 
// //                 key={student.id} 
// //                 className="student-card"
// //                 onClick={() => handleStudentClick(student)}
// //               >
// //                 <div className="student-avatar-container">
// //                   <img 
// //                     src={studentIcon} 
// //                     alt="Student" 
// //                     className="student-avatar-img"
// //                   />
// //                 </div>
// //                 <div className="student-info">
// //                   <h3 className="student-name">{student.name}</h3>
// //                   <p className="student-id">{student.studentId}</p>
// //                   <p className="student-program">{student.program}</p>
// //                   <p className="student-year">{student.year}</p>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="no-students-message">
// //               <i className="fas fa-user-slash"></i>
// //               <p>No students found. Try a different search term or add new students.</p>
// //             </div>
// //           )}
// //         </div>
        
// //         {/* Add Student Button */}
// //         <div className="add-student-container">
// //           <button className="add-student-button" onClick={handleAddStudent}>
// //             <i className="fas fa-user-plus"></i> Add Student
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Students;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getDatabase, ref, onValue } from "firebase/database"; // Firebase imports
// import "../App.css";
// import studentIcon from '../images/ST.jpeg'; // Update with actual icon path

// function Students() {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState([]); // Initially empty
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredStudents, setFilteredStudents] = useState([]);



//   useEffect(() => {
//     const db = getDatabase();
//     const studentsRef = ref(db, "Students"); // Reference to "Students" node

//     onValue(studentsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const studentsData = snapshot.val(); // Get the actual student data
//         const studentsArray = Object.keys(studentsData).map((key) => ({
//           id: key,
//           ...studentsData[key], // Spread the student data under that key
//         }));

//         setStudents(studentsArray); // Set all students
//         setFilteredStudents(studentsArray); // Initialize filtered list with all students
//       } else {
//         setStudents([]); // No students found
//         setFilteredStudents([]);
//       }
//     });
//   }, []); // This effect runs only once when the component mounts

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredStudents(students); // If search term is empty, show all students
//     } else {
//       const filtered = students.filter((student) => {
//         const studentId = student.studentId ? student.studentId.toLowerCase() : ''; // Get studentId and convert to lowercase
//         const lowerSearchTerm = searchTerm.toLowerCase().trim(); // Convert searchTerm to lowercase and trim spaces
        
//         // Log the search term and studentId to debug
//         console.log("Search Term:", lowerSearchTerm);
//         console.log("Student ID:", studentId);
  
//         // Log the result of the includes() comparison
//         const isMatch = studentId.includes(lowerSearchTerm);
//         console.log(`Does ${studentId} include ${lowerSearchTerm}?`, isMatch);
  
//         return isMatch; // Return the filtered result
//       });
  
//       console.log("Filtered Students:", filtered); // Log the filtered students
//       setFilteredStudents(filtered); // Set the filtered list of students
//     }
//   }, [searchTerm, students]); // Run when searchTerm or students change
  
  
  

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleAddStudent = () => {
//     navigate('/AddStudent');
//   };

// //   const handleStudentClick = (student) => {
// //     navigate(`/StudentDetails/${student.id}`, { state: { student } });
// //   };
// const handleStudentClick = (student) => {
//     navigate(`/EditStudent/${student.id}`, { state: { student } });
//   };

//   const handleLogout = () => {
//     navigate('/Login');
//   };

//   return (
//     <div className="students-page">
//       <div className="students-container">
//         <div className="students-controls">
//           <h2 className="page-title">Student Management</h2>
//           <div className="controls-row">
//             <div className="search-container">
//             <div>
//           <button className="logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>

//               <i className="fas fa-search search-icon"></i>
//               <input
//                 type="text"
//                 placeholder="Search by Index Number..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="search-input"
//               />
//             </div>
           
//           </div>
//         </div>

//         <div className="students-grid">
//           {filteredStudents.length > 0 ? (
//             filteredStudents.map((student) => (
//               <div
//                 key={student.id}
//                 className="student-card"
//                 onClick={() => handleStudentClick(student)}
//               >
//                 <div className="student-avatar-container">
//                   <img
//                     src={studentIcon}
//                     alt="Student"
//                     className="student-avatar-img"
//                   />
//                 </div>
//                 <div className="student-info">
//                   <h3 className="student-name">{student.firstName}</h3>
//                   <h3 className="student-name">{student.lastName}</h3>
//                   <p className="student-id">{student.indexNumber}</p>
//                   <p className="student-program">{student.degreeProgram}</p>
//                   <p className="student-year">{student.intake}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-students-message">
//               <i className="fas fa-user-slash"></i>
//               <p>No students found. Try a different search term or add new students.</p>
//             </div>
//           )}
//         </div>

//         <div className="add-student-container">
//           <button className="add-student-button" onClick={handleAddStudent}>
//             <i className="fas fa-user-plus"></i> Add Student
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Students;



















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getDatabase, ref, onValue } from "firebase/database"; // Firebase imports
// import "../App.css";
//  // Add this new CSS file
// import studentIcon from '../images/ST.jpeg'; // Update with actual icon path

// function Students() {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState([]); // Initially empty
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   useEffect(() => {
//     const db = getDatabase();
//     const studentsRef = ref(db, "Students"); // Reference to "Students" node

//     onValue(studentsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const studentsData = snapshot.val(); // Get the actual student data
//         const studentsArray = Object.keys(studentsData).map((key) => ({
//           id: key,
//           ...studentsData[key], // Spread the student data under that key
//         }));

//         setStudents(studentsArray); // Set all students
//         setFilteredStudents(studentsArray); // Initialize filtered list with all students
//       } else {
//         setStudents([]); // No students found
//         setFilteredStudents([]);
//       }
//     });
//   }, []); // This effect runs only once when the component mounts

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredStudents(students); // If search term is empty, show all students
//     } else {
//       const filtered = students.filter((student) => {
//         // Fix: search for indexNumber instead of studentId
//         const indexNumber = student.indexNumber ? student.indexNumber.toLowerCase() : '';
//         const lowerSearchTerm = searchTerm.toLowerCase().trim();
        
//         return indexNumber.includes(lowerSearchTerm);
//       });
      
//       setFilteredStudents(filtered);
//     }
//   }, [searchTerm, students]); // Run when searchTerm or students change

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleAddStudent = () => {
//     navigate('/AddStudent');
//   };

//   const handleStudentClick = (student) => {
//     navigate(`/EditStudent/${student.id}`, { state: { student } });
//   };

//   return (
//     <div className="students-page">
//       <div className="students-container">
//         <div className="students-controls">
//           <h2 className="page-title">Student Management</h2>
//           <div className="controls-row">
//             <div className="search-container">
//               <i className="fas fa-search search-icon"></i>
//               <input
//                 type="text"
//                 placeholder="Search by Index Number... (e.g. D-BSE-23-0007)"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="search-input"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="students-grid">
//           {filteredStudents.length > 0 ? (
//             filteredStudents.map((student) => (
//               <div
//                 key={student.id}
//                 className="student-card"
//                 onClick={() => handleStudentClick(student)}
//               >
//                 <div className="student-avatar-container">
//                   <img
//                     src={studentIcon}
//                     alt="Student"
//                     className="student-avatar-img"
//                   />
//                 </div>
//                 <div className="student-info">
//                   <h3 className="student-name">{student.firstName}</h3>
//                   <h3 className="student-name">{student.lastName}</h3>
//                   <p className="student-id">{student.indexNumber}</p>
//                   <p className="student-program">{student.degreeProgram}</p>
//                   <p className="student-year">{student.intake}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-students-message">
//               <i className="fas fa-user-slash"></i>
//               <p>No students found. Try a different search term or add new students.</p>
//             </div>
//           )}
//         </div>

//         <div className="add-student-container">
//           <button className="add-student-button" onClick={handleAddStudent}>
//             <i className="fas fa-user-plus"></i> Add Student
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Students;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { FaUserGraduate } from "react-icons/fa"; // Import student icon
import "../App.css";


function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const studentsRef = ref(db, "Students");

    onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const studentsData = snapshot.val();
        const studentsArray = Object.keys(studentsData).map((key) => ({
          id: key,
          ...studentsData[key],
        }));

        setStudents(studentsArray);
        setFilteredStudents(studentsArray);
      } else {
        setStudents([]);
        setFilteredStudents([]);
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) => {
        const indexNumber = student.indexNumber ? student.indexNumber.toLowerCase() : '';
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        
        return indexNumber.includes(lowerSearchTerm);
      });
      
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddStudent = () => {
    navigate('/AddStudent');
  };

  const handleStudentClick = (student) => {
    navigate(`/EditStudent/${student.id}`, { state: { student } });
    // Store the student ID in sessionStorage for persistence across page refreshes
    sessionStorage.setItem('selectedStudentId', student.id);
  };

  return (
    <div className="students-page">
      <div className="students-container">
        <div className="students-controls">
          <h2 className="page-title">Student Management</h2>
          <div className="controls-row">
            <div className="search-container">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search by Index Number... (e.g. D-BSE-23-0007)"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="students-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="student-card"
                onClick={() => handleStudentClick(student)}
              >
                <div className="student-avatar-container">
                  <FaUserGraduate className="student-avatar-icon" />
                </div>
                <div className="student-info">
                  <h3 className="student-name">{student.firstName}</h3>
                  <h3 className="student-name">{student.lastName}</h3>
                  <p className="student-id">{student.indexNumber}</p>
                  <p className="student-program">{student.degreeProgram}</p>
                  <p className="student-year">{student.intake}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-students-message">
              <i className="fas fa-user-slash"></i>
              <p>No students found. Try a different search term or add new students.</p>
            </div>
          )}
        </div>

        <div className="add-student-container">
          <button className="add-student-button" onClick={handleAddStudent}>
            <i className="fas fa-user-plus"></i> Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default Students;
