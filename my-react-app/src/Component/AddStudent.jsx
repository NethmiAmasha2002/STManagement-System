// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUserGraduate, FaBook, FaIdCard, FaMapMarkerAlt, FaVenusMars } from 'react-icons/fa';
// import Header from './Header'; // Adjust import path as needed
// import Footer from './Footer'; // Adjust import path as needed
// import '../App.css';

// const AddStudent = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     contactNumber: '',
//     dateOfBirth: '',
//     year: '',
//     semester: '',
//     indexNumber: '',
//     gender: '',
//     address: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add student logic would go here
//     console.log('Student data:', formData);
//     // Navigate back to dashboard
//     navigate('/Dashboard');
//   };

//   const handleCancel = () => {
//     navigate('/Dashboard');
//   };

//   return (
//     <div className="app-container">
//       {/* Header */}
      
//       {/* Main Content */}
//       <div className="add-student-page">
//         <div className="add-student-container">
//           <div className="form-header">
//             <div className="form-icon">
//               <FaUserGraduate />
//             </div>
//             <h2 className="form-title">Add New Student</h2>
//           </div>
          
//           <form onSubmit={handleSubmit} className="student-form">
//             <div className="form-row">
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaUser className="field-icon" />
//                   <span>First Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter first name"
//                   required
//                 />
//               </div>
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaUser className="field-icon" />
//                   <span>Last Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter last name"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaEnvelope className="field-icon" />
//                   <span>Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter email address"
//                   required
//                 />
//               </div>
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaPhone className="field-icon" />
//                   <span>Contact Number</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter phone number"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaCalendarAlt className="field-icon" />
//                   <span>Date of Birth</span>
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   className="form-input date-input"
//                   required
//                 />
//               </div>
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaVenusMars className="field-icon" />
//                   <span>Gender</span>
//                 </label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="form-input form-select dark-select"
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaUserGraduate className="field-icon" />
//                   <span>Year</span>
//                 </label>
//                 <select
//                   name="year"
//                   value={formData.year}
//                   onChange={handleChange}
//                   className="form-input form-select dark-select"
//                   required
//                 >
//                   <option value="">Select Year</option>
//                   <option value="1">Year 1</option>
//                   <option value="2">Year 2</option>
//                   <option value="3">Year 3</option>
//                   <option value="4">Year 4</option>
//                 </select>
//               </div>
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaBook className="field-icon" />
//                   <span>Semester</span>
//                 </label>
//                 <select
//                   name="semester"
//                   value={formData.semester}
//                   onChange={handleChange}
//                   className="form-input form-select dark-select"
//                   required
//                 >
//                   <option value="">Select Semester</option>
//                   <option value="1">Semester 1</option>
//                   <option value="2">Semester 2</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-row single-field">
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaIdCard className="field-icon" />
//                   <span>Index Number</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="indexNumber"
//                   value={formData.indexNumber}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter index number"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row single-field">
//               <div className="form-field">
//                 <label className="form-label">
//                   <FaMapMarkerAlt className="field-icon" />
//                   <span>Address</span>
//                 </label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="form-input form-textarea"
//                   placeholder="Enter full address"
//                   rows="3"
//                   required
//                 ></textarea>
//               </div>
//             </div>

//             <div className="form-actions">
//               <button type="button" className="cancel-btn" onClick={handleCancel}>
//                 Cancel
//               </button>
//               <button type="submit" className="submit-btn">
//                 Add Student
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
      
//       {/* Footer */}
     
//     </div>
//   );
// };

// export default AddStudent;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUserGraduate, FaBook, FaIdCard, FaMapMarkerAlt, FaVenusMars } from 'react-icons/fa';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import based on your project structure
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    dateOfBirth: '',
    year: '',
    semester: '',
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
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error("Error checking/adding student:", error);
      alert("An error occurred while adding the student.");
    }
  };

  const handleCancel = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="app-container">
      <div className="add-student-page">
        <div className="add-student-container">
          <div className="form-header">
            <div className="form-icon">
              <FaUserGraduate />
            </div>
            <h2 className="form-title">Add New Student</h2>
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
                  className="form-input date-input"
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
                  className="form-input form-select dark-select"
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
                  <span>Year</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-input form-select dark-select"
                  required
                >
                  <option value="">Select Intake</option>
                  <option value="1">Intake 42</option>
                  <option value="2">Intake 41</option>
                  <option value="3">Intake 40</option>
                  <option value="4">Intake 39</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">
                  <FaBook className="field-icon" />
                  <span>Semester</span>
                </label>
                <select
                  name="Degree Programme"
                  value={formData.semester}
                  onChange={handleChange}
                  className="form-input form-select dark-select"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="1">Software Engineering</option>
                  <option value="2">Computer Science</option>
                </select>
              </div>
            </div>

            <div className="form-row single-field">
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
            </div>

            <div className="form-row single-field">
              <div className="form-field">
                <label className="form-label">
                  <FaMapMarkerAlt className="field-icon" />
                  <span>Address</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  placeholder="Enter full address"
                  rows="3"
                  required
                ></textarea>
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
  );
};

export default AddStudent;
