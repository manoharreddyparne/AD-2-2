import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [editingField, setEditingField] = useState('');
  const [editedUserData, setEditedUserData] = useState({ firstName: '', surname: '', dateOfBirth: '', _id: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${user.email || user.mobile}`);
          setUserData(response.data);
          setEditedUserData({ ...response.data, firstName: '', surname: '', dateOfBirth: '' });
        } catch (err) {
          setError('Failed to fetch user data');
        }
      };

      fetchUserData();
    } else {
      setError('User not found. Please log in again.');
    }
  }, []);

  const formatDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const date = new Date(dateOfBirth);
    return date.toISOString().substring(0, 10);
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editedUserData._id}`, editedUserData);
      setUserData(editedUserData);
      setEditingField('');
    } catch (err) {
      setError('Failed to update user data');
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {error && <p className="error">{error}</p>}
      <p>
        <strong>First Name:</strong>{' '}
        {editingField === 'firstName' ? (
          <input type="text" name="firstName" value={editedUserData.firstName} onChange={handleChange} />
        ) : (
          <>
            {userData.firstName}{' '}
            <button onClick={() => handleEdit('firstName')}>Edit</button>
          </>
        )}
      </p>
      <p>
        <strong>Surname:</strong>{' '}
        {editingField === 'surname' ? (
          <input type="text" name="surname" value={editedUserData.surname} onChange={handleChange} />
        ) : (
          <>
            {userData.surname}{' '}
            <button onClick={() => handleEdit('surname')}>Edit</button>
          </>
        )}
      </p>
      <p><strong>Mobile:</strong> {userData.mobile}</p>
      <p>
        <strong>Date of Birth:</strong>{' '}
        {editingField === 'dateOfBirth' ? (
          <input type="date" name="dateOfBirth" value={editedUserData.dateOfBirth} onChange={handleChange} />
        ) : (
          <>
            {formatDateOfBirth(userData.dateOfBirth)}{' '}
            <button onClick={() => handleEdit('dateOfBirth')}>Edit</button>
          </>
        )}
      </p>
      <p><strong>Age:</strong> {userData.dateOfBirth ? calculateAge(userData.dateOfBirth) : 'Calculating...'}</p>
      {userData.email && <p><strong>Email:</strong> {userData.email}</p>}
      {editingField && (
        <div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setEditingField('')}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
