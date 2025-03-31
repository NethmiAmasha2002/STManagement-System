
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
