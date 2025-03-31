
// export default UpdateCourseForm;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref, get, set } from "firebase/database";
import { database } from "../firebase";
import "../App.css";
import teachingIcon from "../images/add.jpg";

const UpdateCourseForm = () => {
  const { id } = useParams(); // Get moduleId from URL
  const [moduleId, setModuleId] = useState("");
  const [year, setYear] = useState("1");
  const [semester, setSemester] = useState("Semester 1");
  const [courseName, setCourseName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const years = [
    { label: "First Year", value: "1", semesters: ["Semester 1", "Semester 2"] },
    { label: "Second Year", value: "2", semesters: ["Semester 3", "Semester 4"] },
    { label: "Third Year", value: "3", semesters: ["Semester 5", "Semester 6"] },
    { label: "Fourth Year", value: "4", semesters: ["Semester 7", "Semester 8"] },
  ];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRef = ref(database, `Courses/${id}`);
        const snapshot = await get(courseRef);

        if (snapshot.exists()) {
          const courseData = snapshot.val();
          setModuleId(id); // Use the ID from the URL
          setCourseName(courseData.courseName || "");
          setYear(courseData.year || "1");
          setSemester(courseData.semester || "Semester 1");
        } else {
          console.log("❌ No course found with ID:", id);
        }
      } catch (error) {
        console.error("⚠️ Error fetching course data:", error);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    const defaultSemester = years.find((y) => y.value === selectedYear)?.semesters[0] || "";
    setSemester(defaultSemester);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (moduleId && year && courseName) {
      try {
        const updatedCourse = { courseName, year, semester };
        const courseRef = ref(database, `Courses/${moduleId}`);
        await set(courseRef, updatedCourse);

        setNotification({
          show: true,
          message: "Course updated successfully!",
          type: "success",
        });

        setTimeout(() => {
          setNotification({ show: false, message: "", type: "" });
        }, 3000);
      } catch (error) {
        console.error("Error updating course:", error);
        setNotification({
          show: true,
          message: "Failed to update course. Please try again.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setNotification({
        show: true,
        message: "Please fill in all required fields.",
        type: "error",
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
              <h2 className="add-course-title">Update Course</h2>
              <p className="add-course-subtitle">Modify the course details</p>
            </div>
            <div className="teaching-icon-container">
              <img src={teachingIcon} alt="Teaching" className="teaching-icon" />
            </div>
          </div>

          <div className="add-course-body">
            <form onSubmit={handleSubmit} className="add-course-form">
              <div className="form-group">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Module ID (Read-only)</label>
                <input type="text" value={moduleId} className="form-input" readOnly />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <select value={year} onChange={handleYearChange} className="form-select" required>
                    {years.map((yearOption) => (
                      <option key={yearOption.value} value={yearOption.value}>
                        {yearOption.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="form-select"
                    required
                  >
                    {years.find((y) => y.value === year)?.semesters.map((sem, index) => (
                      <option key={index} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="add-course-button" disabled={isSubmitting}>
                  {isSubmitting ? "Updating Course..." : "Update Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {notification.show && <div className={`notification ${notification.type}`}>{notification.message}</div>}
    </div>
  );
};

export default UpdateCourseForm;
