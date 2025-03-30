// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaBook, FaVenusMars, FaArrowLeft } from "react-icons/fa";
// import Header from "./Header"; // Adjust as needed
// import Footer from "./Footer"; // Adjust as needed
// import "../App.css";
// import avatarIcon from '../images/Remove.png'; // Use an avatar icon

// function EditStudent() {
//   const navigate = useNavigate();
  
//   // Student data state
//   const [studentData, setStudentData] = useState({
//     firstName: "",
//     lastName: "",
//     studentId: "",
//     address: "",
//     dob: "",
//     email: "",
//     degreeProgram: "",
//     enrolledCourses: "",
//     gender: "",
//     phoneNumber: "",
//     intake:""
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({
//       ...studentData,
//       [name]: value
//     });
//   };

//   // Handle form submission
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     // Process the form data
//     console.log("Updated student data:", studentData);
//     // Navigate back to dashboard or students page
//     navigate('/Dashboard');
//   };

//   // Navigate back to previous page
//   const handleBack = () => {
//     navigate('/Dashboard');
//   };

//   return (
//     <div className="app-container">
//       {/* Header */}
     

//       <div className="edit-student-page">
//         <div className="edit-student-container">
//           {/* Back Button */}
//           <button className="back-button" onClick={handleBack}>
//             <FaArrowLeft /> Back to Dashboard
//           </button>

//           {/* Update Details Header */}
//           <div className="update-header">
//             <div className="avatar-container">
//               <img src={avatarIcon} alt="Student" className="update-avatar" />
//             </div>
//             <h2 className="update-title">Update Student Details</h2>
//           </div>

//           {/* Edit Form */}
//           <form className="edit-form" onSubmit={handleUpdate}>
//             <div className="form-grid">
//               {/* Left Column */}
//               <div className="form-column">
//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaUser className="field-icon" />
//                     <span>First Name</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={studentData.firstName}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="Enter first name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaUser className="field-icon" />
//                     <span>Last Name</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={studentData.lastName}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="Enter last name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaIdCard className="field-icon" />
//                     <span>Student ID</span>
//                   </label>
//                   <select
//                     name="studentId"
//                     value={studentData.studentId}
//                     onChange={handleChange}
//                     className="form-input dark-select"
//                   >
//                     <option value="">Select Student ID</option>
//                     <option value="S001">S001</option>
//                     <option value="S002">S002</option>
//                     <option value="S003">S003</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaMapMarkerAlt className="field-icon" />
//                     <span>Address</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={studentData.address}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="Enter address"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaCalendarAlt className="field-icon" />
//                     <span>Date of Birth</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={studentData.dob}
//                     onChange={handleChange}
//                     className="form-input date-input"
//                   />
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="form-column">
//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaEnvelope className="field-icon" />
//                     <span>Email</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={studentData.email}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="Enter email address"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaGraduationCap className="field-icon" />
//                     <span>Degree Program</span>
//                   </label>
//                   <select
//                     name="degreeProgram"
//                     value={studentData.degreeProgram}
//                     onChange={handleChange}
//                     className="form-input dark-select"
//                   >
//                     <option value="">Select Degree Program</option>
//                     <option value="BSc (Hons) in Computer Science">BSc (Hons) in Computer Science</option>
//                     <option value="BSc (Hons) in Software Engineering">BSc (Hons) in Software Engineering</option>
//                     <option value="BSc (Hons) in Information Technology">BSc (Hons) in Information Technology</option>
//                   </select>
//                 </div>

//                 {/* <div className="form-group">
//                   <label className="form-label">
//                     <FaBook className="field-icon" />
//                     <span>Enrolled Courses</span>
//                   </label>
//                   <select
//                     name="enrolledCourses"
//                     value={studentData.enrolledCourses}
//                     onChange={handleChange}
//                     className="form-input dark-select"
//                   >
//                     <option value="">Select Enrolled Courses</option>
//                     <option value="Programming Fundamentals">Programming Fundamentals</option>
//                     <option value="Database Systems">Database Systems</option>
//                     <option value="Web Development">Web Development</option>
//                   </select>
//                 </div> */}

//                 {/* New Intake Selection Dropdown */}

//                 <div className="form-group">
//                 <label className="form-label">
//                     <FaCalendarAlt className="field-icon" /> {/* Use an appropriate icon */}
//                     <span>Intake</span>
//                 </label>
//                 <select
//                     name="intake"
//                     value={studentData.intake}
//                     onChange={handleChange}
//                     className="form-input dark-select"
//                 >
//                     <option value="">Select Intake</option>
//                     <option value="39">39</option>
//                     <option value="40">40</option>
//                     <option value="41">41</option>
//                     <option value="42">42</option>
//                 </select>
//                 </div>


//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaVenusMars className="field-icon" />
//                     <span>Gender</span>
//                   </label>
//                   <select
//                     name="gender"
//                     value={studentData.gender}
//                     onChange={handleChange}
//                     className="form-input dark-select"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <FaPhone className="field-icon" />
//                     <span>Phone Number</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={studentData.phoneNumber}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="form-actions">
//               <button type="button" className="cancel-btn" onClick={handleBack}>
//                 Cancel
//               </button>
//               <button type="submit" className="update-btn">
//                 Update Student
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
      
//       {/* Footer */}
    
//     </div>
//   );
// }

// export default EditStudent;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaVenusMars, FaIdCard, FaMapMarkerAlt, FaGraduationCap, FaSearch } from 'react-icons/fa';
// import { ref, get, update } from 'firebase/database';
// import { database } from '../firebase';

// const EditStudent = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [searchIndex, setSearchIndex] = useState('');
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [studentFound, setStudentFound] = useState(false);
//   const [studentKey, setStudentKey] = useState('');
  
//   // Student data state
//   const [student, setStudent] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     contactNumber: '',
//     dateOfBirth: '',
//     gender: '',
//     year: '',
//     degreeProgram: '',
//     indexNumber: '',
//     address: ''
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudent(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Search for student by index number
//   const searchStudent = async () => {
//     if (!searchIndex.trim()) {
//       setMessage({ text: 'Please enter an index number to search', type: 'error' });
//       return;
//     }

//     setLoading(true);
//     setMessage({ text: '', type: '' });
    
//     try {
//         const db = ref(database);
//       const studentsRef = ref(db, 'students');
//       const snapshot = await get(studentsRef);
      
//       if (snapshot.exists()) {
//         let foundStudent = null;
//         let studentKey = '';
        
//         snapshot.forEach((childSnapshot) => {
//           const data = childSnapshot.val();
//           if (data.indexNumber === searchIndex) {
//             foundStudent = data;
//             studentKey = childSnapshot.key;
//             return true; // Break the loop
//           }
//         });
        
//         if (foundStudent) {
//           setStudent({
//             firstName: foundStudent.firstName || '',
//             lastName: foundStudent.lastName || '',
//             email: foundStudent.email || '',
//             contactNumber: foundStudent.contactNumber || '',
//             dateOfBirth: foundStudent.dateOfBirth || '',
//             gender: foundStudent.gender || '',
//             year: foundStudent.year || '',
//             degreeProgram: foundStudent.degreeProgram || '',
//             indexNumber: foundStudent.indexNumber || '',
//             address: foundStudent.address || ''
//           });
//           setStudentKey(studentKey);
//           setStudentFound(true);
//           setMessage({ text: 'Student found! You can now edit their information.', type: 'success' });
//         } else {
//           setMessage({ text: 'No student found with that index number.', type: 'error' });
//           setStudentFound(false);
//         }
//       } else {
//         setMessage({ text: 'No student records found in database.', type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error searching for student:", error);
//       setMessage({ text: 'Error searching for student: ' + error.message, type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!studentFound) {
//       setMessage({ text: 'Please search for a student first', type: 'error' });
//       return;
//     }
    
//     // Basic validation
//     if (!student.firstName || !student.lastName || !student.email || !student.indexNumber) {
//       setMessage({ text: 'Please fill all required fields', type: 'error' });
//       return;
//     }
    
//     setLoading(true);
//     setMessage({ text: '', type: '' });
    
//     try {
//       const db = getDatabase(firebaseApp);
//       const studentRef = ref(db, `students/${studentKey}`);
      
//       await update(studentRef, student);
      
//       setMessage({ text: 'Student information updated successfully!', type: 'success' });
//       setTimeout(() => {
//         navigate('/Dashboard');
//       }, 2000);
//     } catch (error) {
//       console.error("Error updating student:", error);
//       setMessage({ text: 'Error updating student: ' + error.message, type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate('/Dashboard');
//   };

//   return (
//     <div className="edit-student-container">
//       <div className="search-section">
//         <h2>Edit Student</h2>
//         <p>Search for a student by index number to edit their information</p>
        
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Enter student index number"
//             value={searchIndex}
//             onChange={(e) => setSearchIndex(e.target.value)}
//           />
//           <button onClick={searchStudent} disabled={loading}>
//             {loading ? 'Searching...' : <><FaSearch /> Search</>}
//           </button>
//         </div>
        
//         {message.text && (
//           <div className={`message ${message.type}`}>
//             {message.text}
//           </div>
//         )}
//       </div>
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-row">
//           <div className="form-group">
//             <label><FaUser /> First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={student.firstName}
//               onChange={handleChange}
//               placeholder="Enter first name"
//               disabled={!studentFound}
//             />
//           </div>
          
//           <div className="form-group">
//             <label><FaUser /> Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={student.lastName}
//               onChange={handleChange}
//               placeholder="Enter last name"
//               disabled={!studentFound}
//             />
//           </div>
//         </div>
        
//         <div className="form-row">
//           <div className="form-group">
//             <label><FaEnvelope /> Email</label>
//             <input
//               type="email"
//               name="email"
//               value={student.email}
//               onChange={handleChange}
//               placeholder="Enter email address"
//               disabled={!studentFound}
//             />
//           </div>
          
//           <div className="form-group">
//             <label><FaPhone /> Contact Number</label>
//             <input
//               type="tel"
//               name="contactNumber"
//               value={student.contactNumber}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//               disabled={!studentFound}
//             />
//           </div>
//         </div>
        
//         <div className="form-row">
//           <div className="form-group">
//             <label><FaCalendarAlt /> Date of Birth</label>
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={student.dateOfBirth}
//               onChange={handleChange}
//               disabled={!studentFound}
//             />
//           </div>
          
//           <div className="form-group">
//             <label><FaVenusMars /> Gender</label>
//             <select
//               name="gender"
//               value={student.gender}
//               onChange={handleChange}
//               disabled={!studentFound}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="form-row">
//           <div className="form-group">
//             <label><FaGraduationCap /> Year</label>
//             <select
//               name="year"
//               value={student.year}
//               onChange={handleChange}
//               disabled={!studentFound}
//             >
//               <option value="">Select Year</option>
//               <option value="1">Intake 39</option>
//               <option value="2">Intake 40</option>
//               <option value="3">Intake 41</option>
//               <option value="4">Intake 42</option>
//             </select>
//           </div>
          
//           <div className="form-group">
//             <label><FaGraduationCap /> Degree Program</label>
//             <select
//               name="degreeProgram"
//               value={student.degreeProgram}
//               onChange={handleChange}
//               disabled={!studentFound}
//             >
//               <option value="">Select Degree Program</option>
//               <option value="bsc">BSc Computer Science</option>
//               <option value="ba">BA Computer Systems</option>
//               <option value="beng">BEng Software Engineering</option>
//               <option value="msc">MSc Information Security</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="form-group">
//           <label><FaIdCard /> Index Number</label>
//           <input
//             type="text"
//             name="indexNumber"
//             value={student.indexNumber}
//             onChange={handleChange}
//             placeholder="Enter index number"
//             disabled={!studentFound}
//           />
//         </div>
        
//         <div className="form-group">
//           <label><FaMapMarkerAlt /> Address</label>
//           <textarea
//             name="address"
//             value={student.address}
//             onChange={handleChange}
//             placeholder="Enter full address"
//             disabled={!studentFound}
//           />
//         </div>
        
//         <div className="form-buttons">
//           <button type="button" onClick={handleCancel}>
//             Cancel
//           </button>
//           <button 
//             type="submit" 
//             disabled={loading || !studentFound}
//           >
//             {loading ? 'Updating...' : 'Update Student'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditStudent;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaVenusMars, FaArrowLeft } from "react-icons/fa";
import { getDatabase, ref, get, update,push } from "firebase/database"; // Import Firebase functions
import { database } from "../firebase"; // Import database correctly
import avatarIcon from '../images/Remove.png';
import { getAuth } from "firebase/auth";

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get student ID from URL params

  // Firebase database reference
 
  const studentRef = ref(database, `Students/${id}`); // Use 'database' instead of 'app'


  // Student data state
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    address: "",
    dob: "",
    email: "",
    degreeProgram: "",
    gender: "",
    phoneNumber: "",
    intake: ""
  });

  // Fetch student data from Firebase when component loads
  useEffect(() => {
    get(studentRef).then((snapshot) => {
      if (snapshot.exists()) {
        setStudentData(snapshot.val()); // Update state with fetched data
        console.log(snapshot.val())
      } else {
        console.log("No student data found");
      }
    }).catch((error) => {
      console.error("Error fetching student data:", error);
    });
  }, [id]); // Run when studentId changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     update(studentRef, studentData)
//       .then(() => {
//         console.log("Student data updated successfully");
//         navigate("/Dashboard");
//       })
//       .catch((error) => {
//         console.error("Error updating student data:", error);
//       });
//   };

  const [notification, setNotification] = useState({
      show: false,
      message: "",
      type: ""
    });

const handleUpdate = (e) => {
    e.preventDefault();
    
    // Show success notification
    setNotification({
      show: true,
      message: "Student updated successfully!",
      type: "success"
    });
  
    
    // Update student data in the database
    update(studentRef, studentData)
      .then(() => {
        console.log("Student data updated successfully");
        logUpdateDetails(id,"Student details updated");
  
        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification({
            show: false,
            message: "",
            type: ""
          });
          navigate("/Dashboard");
        }, 1500);
 
      })
      .catch((error) => {
        console.error("Error updating student data:", error);
      });
  };
  
  const logUpdateDetails = (id, description) => {
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

    // Create log data with description, current user, and timestamp
    const logData = {
      description: `${description} for student with ID: ${id}`,
      updatedBy: user.email || "Unknown User",
      updatedAt: new Date().toISOString(),
      studentId: id // Only saving the student ID for reference
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
    navigate("/Dashboard");
  };

  return (
    <div className="app-container">
      <div className="edit-student-page">
        <div className="edit-student-container">
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft /> Back to Dashboard
          </button>

          <div className="update-header">
            <div className="avatar-container">
              <img src={avatarIcon} alt="Student" className="update-avatar" />
            </div>
            <h2 className="update-title">Update Student Details</h2>
          </div>

          <form className="edit-form" onSubmit={handleUpdate}>
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaUser className="field-icon" />
                    <span>First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={studentData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaUser className="field-icon" />
                    <span>Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={studentData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter last name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaIdCard className="field-icon" />
                    <span>Student ID</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={studentData.indexNumber}
                    className="form-input"
                    readOnly // Student ID should not be editable
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaMapMarkerAlt className="field-icon" />
                    <span>Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={studentData.address}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaCalendarAlt className="field-icon" />
                    <span>Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={studentData.dateOfBirth}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaEnvelope className="field-icon" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaGraduationCap className="field-icon" />
                    <span>Degree Program</span>
                  </label>
                  <input
                    type="text"
                    name="degreeProgram"
                    value={studentData.degreeProgram}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter degree program"
                  />
                </div>


                <div className="form-group">
                  <label className="form-label">
                    <FaCalendarAlt className="field-icon" />
                    <span>Intake</span>
                  </label>
                  <input
                    type="text"
                    name="intake"
                    value={studentData.intake}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter intake"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaVenusMars className="field-icon" />
                    <span>Gender</span>
                  </label>
                  <select
                    name="gender"
                    value={studentData.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleBack}>Cancel</button>
              <button type="submit" className="update-btn" >Update Student</button>
            </div>
          </form>
        </div>
                    {notification.show && (
            <div className={`notification ${notification.type}`}>
                {notification.message}
            </div>
            )}
      </div>
    </div>
  );
}

export default EditStudent;