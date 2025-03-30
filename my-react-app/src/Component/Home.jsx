import React from 'react';
import { useNavigate } from 'react-router-dom';
 // Make sure this path is correct
import sideImage from '../images/KDU.jpg'; // Replace with actual path
import { FaEnvelope, FaUsers, FaPaperPlane, FaUserGraduate } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Login'); // Navigate to login page
  };

  return (
    <div className="app-container">
      {/* Header Section */}
     

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Text Section */}
          <div className="text-section">
            <h2 className="program-title">Software Engineering Degree Program</h2>
            <p className="program-description">
              BSc (Hons) in Software Engineering program is concerned with the development and 
              maintenance of software systems that behave reliably and efficiently. This program is 
              different in character from other engineering disciplines due to both the intangible 
              nature of software and the discontinuous nature of software operation. Modules of 
              this program seeks to integrate the principles of mathematics and computer science 
              with the engineering practices developed for tangible,physical artifacts.
            </p>
            <p className="program-description">
              Degree programs in software engineering have many courses. This program offers 
              more about software reliability and maintenance and focus more on techniques for 
              developing and maintaining software that is correct from its inception. The curriculum 
              has been designed according to ACM/IEE international standard and it has been 
              approved by the University Grants Commission of Sri Lanka.
            </p>
            
            <div className="login-button-container">
              <button
                onClick={handleLogin}
                className="login-button"
              >
                Login as Admin
              </button>
            </div>
          </div>
          
          {/* Side Image */}
          <div className="image-section">
            <img src={sideImage} alt="University Building" className="side-image" />
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          {/* Contact Us */}
          <div className="service-card">
            <div className="service-icon-container">
              <FaEnvelope className="service-icon" />
            </div>
            <h3 className="service-title">Contact Us</h3>
            <p className="service-description">
  <a href="mailto:kdudefence@kdu.ac.lk">kdudefence@kdu.ac.lk</a>
</p>

          </div>
          
          {/* Counselling Services */}
          <div className="service-card">
            <div className="service-icon-container">
              <FaUsers className="service-icon" />
            </div>
            <h3 className="service-title">Counselling Services</h3>
            <p className="service-description">
            Ms. MKOK De Silva<p>(Clinical Psychologis)</p> 
            0718424659
            </p>
          </div>
          
          {/* Rules */}
          <div className="service-card">
            <div className="service-icon-container">
              <FaPaperPlane className="service-icon" />
            </div>
            <h3 className="service-title">Telephone Number</h3>
            <p className="service-description">
            011-2635268
            </p>
          </div>
          
          {/* Guest Talks */}
          <div className="service-card">
            <div className="service-icon-container">
              <FaUserGraduate className="service-icon" />
            </div>
            <h3 className="service-title">Guest Talks</h3>
            <p className="service-description">
            Dr. (Maj) RMM Pradeep (Retd)
            Senior Lecturer Grade I
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

