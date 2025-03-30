// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSearch, FaCalendarAlt, FaFilter, FaFileDownload } from 'react-icons/fa';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import '../App.css';

// const Audit = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [auditLogs, setAuditLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
  
//   // Date selection states
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [dateRange, setDateRange] = useState([new Date(), new Date()]);
//   const [dateDisplayText, setDateDisplayText] = useState('Select Date Range');
//   const calendarRef = useRef(null);

//   // Example audit logs - in a real implementation, you would fetch this from Firebase
//   useEffect(() => {
//     const fetchAuditLogs = async () => {
//       // This would be replaced with your Firebase fetch logic
//       const logs = [
//         {
//           id: 1,
//           action: 'Student Added',
//           description: 'Added new student: John Doe',
//           performedBy: 'admin@kdu.ac.lk',
//           timestamp: '2025-03-26T10:30:45',
//           module: 'Student Management'
//         },
//         {
//           id: 2,
//           action: 'Course Modified',
//           description: 'Updated course: Software Engineering',
//           performedBy: 'admin@kdu.ac.lk',
//           timestamp: '2025-03-25T14:22:18',
//           module: 'Course Management'
//         },
//         {
//           id: 3,
//           action: 'Student Deleted',
//           description: 'Deleted student: Sarah Johnson',
//           performedBy: 'admin@kdu.ac.lk',
//           timestamp: '2025-03-24T09:15:30',
//           module: 'Student Management'
//         },
//         {
//           id: 4,
//           action: 'Reminder Added',
//           description: 'Added reminder: Exam Schedule',
//           performedBy: 'admin@kdu.ac.lk',
//           timestamp: '2025-03-23T16:40:12',
//           module: 'Reminders'
//         },
//         {
//           id: 5,
//           action: 'Student Modified',
//           description: 'Updated student details: Michael Smith',
//           performedBy: 'admin@kdu.ac.lk',
//           timestamp: '2025-03-22T11:05:56',
//           module: 'Student Management'
//         }
//       ];
      
//       setAuditLogs(logs);
//       setFilteredLogs(logs);
//     };
    
//     fetchAuditLogs();
//   }, []);

//   // Handle clicks outside of calendar to close it
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//         setShowCalendar(false);
//       }
//     }
    
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [calendarRef]);

//   // Apply filters when any filter criteria changes
//   useEffect(() => {
//     let result = auditLogs;
    
//     // Filter by search term
//     if (searchTerm) {
//       result = result.filter(log => 
//         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         log.module.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Filter by date range
//     if (dateRange && dateRange.length === 2) {
//       const startDate = new Date(dateRange[0]);
//       startDate.setHours(0, 0, 0, 0); // Start of day
      
//       const endDate = new Date(dateRange[1]);
//       endDate.setHours(23, 59, 59, 999); // End of day
      
//       result = result.filter(log => {
//         const logDate = new Date(log.timestamp);
//         return logDate >= startDate && logDate <= endDate;
//       });
//     }
    
//     // Filter by type
//     if (filterType !== 'all') {
//       result = result.filter(log => log.module === filterType);
//     }
    
//     setFilteredLogs(result);
//   }, [searchTerm, dateRange, filterType, auditLogs]);

//   // Handle date range selection
//   const handleDateChange = (value) => {
//     setDateRange(value);
//     setShowCalendar(false);
    
//     // Format date for display
//     if (value && value.length === 2) {
//       const startDate = formatDateShort(value[0]);
//       const endDate = formatDateShort(value[1]);
//       setDateDisplayText(`${startDate} - ${endDate}`);
//     }
//   };

//   // Format date for display in the date selector button
//   const formatDateShort = (date) => {
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   // Format timestamp for display in the table
//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Export audit logs as CSV
//   const exportAuditLogs = () => {
//     // Create CSV content
//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "ID,Action,Description,Performed By,Timestamp,Module\n";
    
//     filteredLogs.forEach(log => {
//       csvContent += `${log.id},${log.action},"${log.description}",${log.performedBy},${log.timestamp},${log.module}\n`;
//     });
    
//     // Create download link
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `audit_logs_export_${new Date().toISOString().slice(0, 10)}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Navigate back to dashboard
//   const handleBackToDashboard = () => {
//     navigate('/Dashboard');
//   };

//   return (
//     <div className="audit-page">
//       {/* Header */}
    

//       <div className="audit-container">
//         <div className="audit-header">
//           <h2 className="page-title">Audit Trail</h2>
//           <button className="back-button" onClick={handleBackToDashboard}>
//             Back to Dashboard
//           </button>
//         </div>

//         {/* Filters Section */}
//         <div className="audit-filters-light">
//           <div className="search-container">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search audit logs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>
          
//           <div className="date-range-selector">
//             <div className="date-picker-button" onClick={() => setShowCalendar(!showCalendar)}>
//               <FaCalendarAlt className="calendar-icon" />
//               <span>{dateDisplayText}</span>
//             </div>
            
//             {showCalendar && (
//               <div className="calendar-popup" ref={calendarRef}>
//                 <Calendar 
//                   onChange={handleDateChange}
//                   value={dateRange}
//                   selectRange={true}
//                   className="audit-calendar"
//                 />
//               </div>
//             )}
//           </div>
          
//           <div className="type-filter">
//             <FaFilter className="filter-icon" />
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="filter-select-light"
//             >
//               <option value="all">All Activities</option>
//               <option value="Student Management">Student Management</option>
//               <option value="Course Management">Course Management</option>
//               <option value="Reminders">Reminders</option>
//             </select>
//           </div>
          
//           <button className="export-button" onClick={exportAuditLogs}>
//             <FaFileDownload className="export-icon" /> Export
//           </button>
//         </div>

//         {/* Audit Logs Table */}
//         <div className="audit-table-container">
//           <table className="audit-table">
//             <thead>
//               <tr>
//                 <th>Action</th>
//                 <th>Description</th>
//                 <th>Performed By</th>
//                 <th>Timestamp</th>
//                 <th>Module</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLogs.length > 0 ? (
//                 filteredLogs.map(log => (
//                   <tr key={log.id} className="audit-row">
//                     <td className="audit-action">{log.action}</td>
//                     <td className="audit-description">{log.description}</td>
//                     <td className="audit-user">{log.performedBy}</td>
//                     <td className="audit-timestamp">{formatTimestamp(log.timestamp)}</td>
//                     <td className="audit-module">{log.module}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="no-records">
//                     No audit records found. Try adjusting your filters.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Audit;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaFilter, FaFileDownload } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import { database, auth } from '../firebase';  // Import Firebase config
import { ref, get } from 'firebase/database';

const Audit = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [auditLogs, setAuditLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  
  // Date selection states
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [dateDisplayText, setDateDisplayText] = useState('Select Date Range');
  const calendarRef = useRef(null);

  // Fetch audit logs from Firebase
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        // Get a reference to the 'logs' node
        const logsRef = ref(database, 'logs');
        
        // Fetch the logs data from Firebase
        const snapshot = await get(logsRef);
        
        if (snapshot.exists()) {
          const logs = [];
          snapshot.forEach(childSnapshot => {
            const log = childSnapshot.val();
            logs.push({
              id: childSnapshot.key,  // Unique key from Firebase
              ...log
            });
          });

          setAuditLogs(logs);
          setFilteredLogs(logs);
        } else {
          console.log("No logs found");
        }
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };
    
    fetchAuditLogs();
  }, []);

  // Handle clicks outside of calendar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  // Apply filters when any filter criteria changes
  useEffect(() => {
    let result = auditLogs;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.module.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by date range
    if (dateRange && dateRange.length === 2) {
      const startDate = new Date(dateRange[0]);
      startDate.setHours(0, 0, 0, 0); // Start of day
      
      const endDate = new Date(dateRange[1]);
      endDate.setHours(23, 59, 59, 999); // End of day
      
      result = result.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate && logDate <= endDate;
      });
    }
    
    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(log => log.module === filterType);
    }
    
    setFilteredLogs(result);
  }, [searchTerm, dateRange, filterType, auditLogs]);

  // Handle date range selection
  const handleDateChange = (value) => {
    setDateRange(value);
    setShowCalendar(false);
    
    // Format date for display
    if (value && value.length === 2) {
      const startDate = formatDateShort(value[0]);
      const endDate = formatDateShort(value[1]);
      setDateDisplayText(`${startDate} - ${endDate}`);
    }
  };

  // Format date for display in the date selector button
  const formatDateShort = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format timestamp for display in the table
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export audit logs as CSV
  const exportAuditLogs = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Action,Description,Performed By,Timestamp,Module\n";
    
    filteredLogs.forEach(log => {
      csvContent += `${log.id},${log.action},"${log.description}",${log.performedBy},${log.timestamp},${log.module}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit_logs_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="audit-page">
      {/* Header */}
      <div className="audit-container">
        <div className="audit-header">
          <h2 className="page-title">Audit Trail</h2>
          <button className="back-button" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </div>

        {/* Filters Section */}
        <div className="audit-filters-light">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
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
          
          <button className="export-button" onClick={exportAuditLogs}>
            <FaFileDownload className="export-icon" /> Export
          </button>
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
                <th>Timestamp</th>
                <th>Module</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.action}</td>
                  <td>{log.description
                  }</td>
                  <td>{log.performedBy}</td>
                  <td>{formatTimestamp(log.timestamp)}</td>
                  <td>{log.module}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Audit;
