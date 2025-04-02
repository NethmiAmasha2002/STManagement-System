import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaFilter, FaFileDownload } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import { database, auth } from '../firebase';  // Import Firebase config
import { ref, get } from 'firebase/database';

const Audit = () => {

  // Navigate back to dashboard
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [auditLogs, setAuditLogs] = useState([]);  // Stores all logs
  const [filteredLogs, setFilteredLogs] = useState([]); // Stores logs after filtering
  
  // Date selection states
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateDisplayText, setDateDisplayText] = useState('Select Date Range');
  const calendarRef = useRef(null);

  //  Fetch audit logs from Firebase on page load
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const logsRef = ref(database, 'logs');
        const snapshot = await get(logsRef);
        
        if (snapshot.exists()) {
          const logs = [];
          snapshot.forEach(childSnapshot => {
            const log = childSnapshot.val();
            logs.push({
              id: childSnapshot.key,
              ...log
            });
          });

          setAuditLogs(logs);  // Store original logs
          setFilteredLogs(logs);  // Default display all logs
        } else {
          console.log("No logs found");
        }
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };
    
    fetchAuditLogs();
  }, []);

  //  Apply filters when any filter criteria changes
  useEffect(() => {
    let result = [...auditLogs];  // Start with all logs

    // 🔹 Search filter
    if (searchTerm) {
      result = result.filter(log => 
        log.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.updatedBy?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 🔹 Date range filter
    if (dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]).setHours(0, 0, 0, 0);
      const endDate = new Date(dateRange[1]).setHours(23, 59, 59, 999);
      
      result = result.filter(log => {
        const logDate = new Date(log.updatedAt).getTime();
        return logDate >= startDate && logDate <= endDate;
      });
    }
    
    // 🔹 Activity type filter
    if (filterType !== 'all') {
      result = result.filter(log => log.type === filterType);
    }
    
    setFilteredLogs(result);
  }, [searchTerm, dateRange, filterType, auditLogs]);

  //  Handle date range selection
  const handleDateChange = (value) => {
    setDateRange(value);
    setShowCalendar(false);
    if (value.length === 2) {
      setDateDisplayText(`${formatDateShort(value[0])} - ${formatDateShort(value[1])}`);
    }
  };

  // Format date for UI display
  const formatDateShort = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  //  Format timestamp for table display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";  // Handle invalid cases
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="audit-page">
      {/* Header */}
      <div className="audit-container">
        <div className="audit-header">
          <h2 className="page-title">Audit Trail</h2>
        </div>

        {/* Filters Section */}
        <div className="audit-filters-light">
          {}
          
          <div className="date-range-selector">
            <div className="date-picker-button" onClick={() => setShowCalendar(!showCalendar)}>
              <FaCalendarAlt className="calendar-icon" />
              <span>{dateDisplayText}</span>
            </div>
            
            {showCalendar && (
              <div className="calendar-popup" ref={calendarRef}>
                <Calendar 
                  onChange={handleDateChange}
                  value={dateRange}
                  selectRange={true}
                  className="audit-calendar"
                />
              </div>
            )}
          </div>
          
          <div className="type-filter">
            <FaFilter className="filter-icon" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select-light"
            >
              <option value="all">All Activities</option>
              <option value="Student Management">Student Management</option>
              <option value="Course Management">Course Management</option>
              <option value="Reminders">Reminders</option>
            </select>
          </div>
          
          {/* <button className="export-button" onClick={exportAuditLogs}>
            <FaFileDownload className="export-icon" /> Export
          </button> */}
        </div>

        {/* Audit Logs Table */}
        <div className="audit-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Action</th>
                <th>Description</th>
                <th>Performed By</th>
                <th>Date & Time</th>
              
              </tr>
            </thead>
            <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort by `updatedAt` in descending order
                .map(log => (
                  <tr key={log.id}>
                    <td>{log.logId}</td>
                    <td>{log.type}</td>
                    <td>{log.description}</td>
                    <td>{log.updatedBy}</td>
                    <td>{log.updatedAt ? formatTimestamp(log.updatedAt) : "N/A"}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5">No logs available</td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Audit;
