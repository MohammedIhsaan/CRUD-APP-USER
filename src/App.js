import React, { useState } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditForm';
import './style.css';

export default function App() {
  const usersData = [
    { id: 1, name: 'Ihsaan', username: 'MohdIhsaan' },
    { id: 2, name: 'Shoeb', username: 'ShikhShoeb' },
    { id: 3, name: 'afsar', username: 'BagwaanAfsar' }
  ];

  const [users, setUsers] = useState(usersData);
  //callBack Props//
  const addUser = user => {
    user.id = user.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  const [editing, setEditing] = useState(false);
  const initailFormState = { id: null, name: '', username: '' };
  const [currentUser, setCurrentUser] = useState(initailFormState);

  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable user={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
}
