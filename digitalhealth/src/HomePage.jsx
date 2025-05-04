import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css';
import healthImage from './assets/healthhero.jpeg';

function HomePage() {
  return (
    <div className="homepage">
      <header className="navbar">
        <h1>Digital Health Records</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <section className="hero-full">
        <div className="hero-content">
          <h2>Your Health, One Click Away</h2>
          <p>Securely manage medical history, prescriptions, and reports – anytime, anywhere.</p>
          <div className="cta-buttons">
            <Link to="/login"><button className="primary">Login</button></Link>
            <Link to="/register"><button className="outline">Register</button></Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h3>What You Can Do</h3>
        <div className="feature-cards">
          <div className="card">
            <span>🧾</span>
            <h4>View Prescriptions</h4>
            <p>Instant access to your prescriptions from anywhere.</p>
          </div>
          <div className="card">
            <span>🩺</span>
            <h4>Update Records</h4>
            <p>Doctors can securely update your health records.</p>
          </div>
          <div className="card">
            <span>📊</span>
            <h4>Generate Reports</h4>
            <p>Auto-generate medical reports for hospitals or labs.</p>
          </div>
        </div>
      </section>

      <footer>
  <p>© 2025 Digital Health System</p>
</footer>

    </div>
  );
}

export default HomePage;