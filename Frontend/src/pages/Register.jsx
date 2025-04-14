import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" onChange={handleChange} className="input" required />
          <input name="name" placeholder="Full Name" onChange={handleChange} className="input" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="input" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn">Register</button>
        </form>
        <p className="text-sm mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
