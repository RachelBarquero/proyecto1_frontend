import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminKids = () => {
  const [children, setChildren] = useState([]);

  const fetchChildren = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/kids?id=${localStorage.getItem("Id")}`);
      if (!response.ok) {
        throw new Error('Error fetching children');
      }
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/kids?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error deleting child');
      }
      fetchChildren();
    } catch (error) {
      console.error('Error deleting child:', error);
    }
  };

  const handleEdit = (child) => {
    localStorage.setItem('childToEdit', JSON.stringify(child)); 
    window.location.href = '/editProfile'; 
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div className="children-container">
      <h2>Children</h2>
      <Link to="/createKids">
        <button>Create new profile</button>
      </Link>
      <ul className="child-list">
        {children.map(child => (
          <li className="child-item" key={child._id}>
            <img
              className="child-avatar"
              src={child.avatar}
              alt='avatar'
            />
            <div className="child-details">
              <p className="child-name">Name: {child.name}</p>
              <p className="child-age">Age: {child.age}</p>
              <p className="child-pin">PIN: {child.pin}</p>
            </div>
            <button onClick={() => handleDelete(child._id)}>Delete</button>
            <button onClick={() => handleEdit(child)}>Edit profile</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminKids;