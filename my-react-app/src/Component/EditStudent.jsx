

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