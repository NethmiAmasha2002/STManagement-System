import React from "react";
import departmentImage from '../images/Logo.png';
import '../App.css'; // Make sure to import the CSS file

function Header() {
  return (
    <header className="header-container">
      <div className="upper-red-stripe"></div>
      <div className="header-content">
        <div className="logo-text-container">
          <img src={departmentImage} alt="Department Logo" className="department-logo" />
          <div className="header-text">
            <h1 className="department-title">Department of Computer Science</h1>
            <h2 className="university-name">General Sir John Kotelawala Defence University</h2>
          </div>
        </div>
      </div>
      <div className="lower-red-stripe"></div>
    </header>
  );
}

export default Header;
