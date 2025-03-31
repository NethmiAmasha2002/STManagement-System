

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaBell, FaTrash, FaPlus } from 'react-icons/fa';
import {getDatabase, ref, push, set, onValue, remove, get } from 'firebase/database';
import { database } from '../firebase'; // Ensure correct path to your Firebase config
import '../App.css';
import { getAuth } from "firebase/auth";

const Reminders = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminderText, setReminderText] = useState('');
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminders, setReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Format date to string (YYYY-MM-DD)
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Load reminders from Firebase and remove past reminders
  useEffect(() => {
    const remindersRef = ref(database, 'Reminders');

    onValue(remindersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const today = formatDate(new Date());
        const loadedReminders = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .filter((reminder) => {
            if (reminder.date < today) {
              remove(ref(database, `Reminders/${reminder.id}`)); // Remove past reminders
              return false;
            }
            return true;
          });

        setReminders(loadedReminders);
        filterRemindersByDate(selectedDate, loadedReminders);
      } else {
        setReminders([]);
        setFilteredReminders([]);
      }
    });
  }, []);

  // Filter reminders when date changes
  const filterRemindersByDate = (date, reminderList = reminders) => {
    const formattedDate = formatDate(date);
    const filtered = reminderList.filter(reminder => reminder.date === formattedDate);
    setFilteredReminders(filtered);
  };

  // Handle date change from calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterRemindersByDate(date);
  };

  // Handle form submission for new reminder
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reminderTitle.trim()) {
      setErrorMessage('Reminder title is required');
      return;
    }

    const newReminder = {
      title: reminderTitle,
      description: reminderText,
      date: formatDate(selectedDate),
      createdAt: new Date().toISOString()
    };

    // Save to Firebase
    const reminderRef = push(ref(database, 'Reminders'));
    await set(reminderRef, newReminder);
    logUpdateDetails("Add Reminder")

    // Clear form
    setReminderTitle('');
    setReminderText('');
    setErrorMessage('');
  };

  // Handle reminder deletion
  const handleDeleteReminder = async (id) => {
    await remove(ref(database, `Reminders/${id}`));
  };

  const logUpdateDetails = async (description) => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser; 

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
      description: `${description} `,
      updatedBy: user.email || "Unknown User",
      updatedAt: new Date().toISOString(),
      type: "Reminders"
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
    <div className="reminders-page">
      <div className="reminders-container">
        <div className="reminders-header">
          <h2 className="page-title">Reminders Management</h2>
        </div>

        <div className="reminders-content">
          {/* Calendar Section */}
          <div className="reminders-calendar-section">
            <div className="calendar-container">
              <h3 className="section-subtitle">Select Date</h3>
              <Calendar 
                onChange={handleDateChange} 
                value={selectedDate}
                className="reminders-calendar"
              />
            </div>
            <div className="selected-date">
              <h3>Selected Date:</h3>
              <p className="date-display">{selectedDate.toDateString()}</p>
            </div>
          </div>

          {/* Reminders List Section */}
          <div className="reminders-list-section">
            <h3 className="section-subtitle">
              Reminders for {selectedDate.toDateString()}
            </h3>
            
            {filteredReminders.length > 0 ? (
              <div className="reminders-list">
                {filteredReminders.map(reminder => (
                  <div key={reminder.id} className="reminder-card">
                    <div className="reminder-icon">
                      <FaBell />
                    </div>
                    <div className="reminder-content">
                      <h4 className="reminder-title">{reminder.title}</h4>
                      <p className="reminder-description">{reminder.description}</p>
                    </div>
                    <button 
                      className="delete-reminder-btn"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-reminders">
                <p>No reminders for this date.</p>
              </div>
            )}
          </div>

          {/* Add Reminder Section */}
          <div className="add-reminder-section">
            <h3 className="section-subtitle">Add New Reminder</h3>
            
            <form onSubmit={handleSubmit} className="reminder-form">
              <div className="form-group">
                <label htmlFor="reminderTitle">Title *</label>
                <input
                  type="text"
                  id="reminderTitle"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  placeholder="Enter reminder title"
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="reminderText">Description</label>
                <textarea
                  id="reminderText"
                  value={reminderText}
                  onChange={(e) => setReminderText(e.target.value)}
                  placeholder="Enter reminder details"
                  className="form-control"
                  rows="4"
                />
              </div>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              
              <button type="submit" className="add-reminder-button">
                <FaPlus /> Add Reminder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
