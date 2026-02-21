


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend API Call
      const res = await axios.post("http://localhost:8080/api/auth/register", { 
        email, 
        password 
      });

      // Professional English Success Message
      alert("Registration successful! You can now log in.");
      navigate("/login"); 

    } catch (err) {
      // Professional English Error Handling
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create your account</h2>
        
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="6"
            />
          </div>

          <button type="submit" style={styles.button}>Sign up</button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

// Styling for Professional Look
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#343541' },
  card: { background: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
  title: { marginBottom: '24px', color: '#2d333a', fontSize: '32px', fontWeight: '700' },
  form: { textAlign: 'left' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', color: '#6e6e80', fontWeight: '500' },
  input: { width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #c2c8d0', fontSize: '16px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#10a37f', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: '600' },
  errorBox: { color: '#d32f2f', backgroundColor: '#fdecea', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', border: '1px solid #facccc' },
  footerText: { marginTop: '24px', fontSize: '14px', color: '#2d333a' },
  link: { color: '#10a37f', textDecoration: 'none', fontWeight: '500' }
};

export default Signup;