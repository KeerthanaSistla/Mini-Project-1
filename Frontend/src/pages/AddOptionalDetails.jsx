import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const AddOptionalDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: localStorage.getItem('userEmail'),
    phoneNumber: '',
    telephoneNumber: '',
    hobbies: '',
    location: '',
    occupation: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch('/auth/optional-details', formData);
      navigate('/');
    } catch (err) {
      console.error('Error updating profile', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Additional Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="input" />
          <input name="telephoneNumber" placeholder="Telephone Number" onChange={handleChange} className="input" />
          <input name="hobbies" placeholder="Hobbies" onChange={handleChange} className="input" />
          <input name="location" placeholder="Location" onChange={handleChange} className="input" />
          <input name="occupation" placeholder="Occupation" onChange={handleChange} className="input" />
          <button type="submit" className="btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddOptionalDetails;
