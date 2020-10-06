import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from './apiAdmin';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    getUsers().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  const destroy = userId => {
    deleteUser(userId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadUsers();
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  console.log('users', users);

  return (
    <Layout>
      <div className='row'>
        <div className='col-12'>
          <ul className='list-group'>
            {users.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.name}</strong>
                <Link to={`/profile/${p._id}`}>
                  <span className='badge badge-warning badge-pill'>Update</span>
                </Link>
                <span
                  onClick={() => destroy(p._id)}
                  className='badge badge-danger badge-pill'
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageUsers;
