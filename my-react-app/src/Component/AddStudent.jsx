



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUserGraduate, FaBook, FaIdCard, FaMapMarkerAlt, FaVenusMars } from 'react-icons/fa';
import { getDatabase, ref, set, get, child, push} from 'firebase/database';
import { database } from '../firebase'; // Adjust the import based on your project structure
import Header from './Header';
import Footer from './Footer';
import '../App.css';
 // Make sure to create this CSS file
import { getAuth } from "firebase/auth";

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    dateOfBirth: '',
    intake: '',
    degreeProgram: '',
    indexNumber: '',
    gender: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { indexNumber } = formData;

    if (!indexNumber.trim()) {
      alert("Index number is required!");
      return;
    }

    const dbRef = ref(database);
    try {
      // Check if the index number already exists
      const snapshot = await get(child(dbRef, `Students/${indexNumber}`));
      if (snapshot.exists()) {
        alert("This index number is already registered.");
      } else {
        // Save student data under the index number
        await set(ref(database, `Students/${indexNumber}`), formData);
        alert("Student added successfully!");
        logUpdateDetails(indexNumber, "Add new student")
        saveRecentStudent(formData.firstName,indexNumber);
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error("Error checking/adding student:", error);
      alert("An error occurred while adding the student.");
    }
  };


const saveRecentStudent = async (studentName, indexNumber) => {
  try {
    const recentStudentRef = ref(database, "RecentStudent");

    // Fetch the current list of recent students
    const snapshot = await get(recentStudentRef);
    let recentStudents = [];

    if (snapshot.exists()) {
      recentStudents = Object.entries(snapshot.val()).map(([id, data]) => ({
        id,
        ...data,
      }));
    }

    // If there are already 5 students, remove the oldest one
    if (recentStudents.length >= 5) {
      const oldestStudentId = recentStudents[0].id; // Get the oldest entry (first in the array)
      await remove(ref(database, `RecentStudent/${oldestStudentId}`)); // Remove it from the database
    }

    // Add the new student
    const newStudentRef = push(recentStudentRef); // Generate a new ID
    await set(newStudentRef, {
      studentName,
      indexNumber,
      timestamp: Date.now(), // Save timestamp for sorting if needed later
    });

    console.log("Student saved successfully in RecentStudent!");
  } catch (error) {
    console.error("Error saving student:", error);
  }
};


  const handleCancel = () => {
    navigate('/Dashboard');
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
      studentId: id, // Only saving the student ID for reference
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

  return (
    <div className="app-container">
      <div className="add-student-page">
        <div className="add-student-container">
          <div className="form-content">
            <div className="title-section">
              <div className="title-icon">
                <FaUserGraduate />
              </div>
              <h2>Add New Student</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="student-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    <FaUser className="field-icon" />
                    <span>First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    <FaUser className="field-icon" />
                    <span>Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    <FaEnvelope className="field-icon" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    <FaPhone className="field-icon" />
                    <span>Contact Number</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    <FaCalendarAlt className="field-icon" />
                    <span>Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">
                    <FaVenusMars className="field-icon" />
                    <span>Gender</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input form-select"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    <FaUserGraduate className="field-icon" />
                    <span>Intake</span>
                  </label>
                  <select
                    name="intake"
                    value={formData.intake}
                    onChange={handleChange}
                    className="form-input form-select"
                    required
                  >
                    <option value="">Select Intake</option>
                    <option value="Intake 39">Intake 39</option>
                    <option value="Intake 40">Intake 40</option>
                    <option value="Intake 41">Intake 41</option>
                    <option value="Intake 42">Intake 42</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">
                    <FaBook className="field-icon" />
                    <span>Degree Program</span>
                  </label>
                  <select
                    name="degreeProgram"
                    value={formData.degreeProgram}
                    onChange={handleChange}
                    className="form-input form-select"
                    required
                  >
                    <option value="">Select Degree Program</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Enginering</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    <FaIdCard className="field-icon" />
                    <span>Index Number</span>
                  </label>
                  <input
                    type="text"
                    name="indexNumber"
                    value={formData.indexNumber}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter index number"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    <FaMapMarkerAlt className="field-icon" />
                    <span>Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter full address"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;