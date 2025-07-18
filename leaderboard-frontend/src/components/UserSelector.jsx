import React, { useState } from 'react';

const UserSelector = ({ users, onUserSelect, onAddUser }) => {
  const [username, setUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    if (username.trim()) {
      onAddUser(username.trim());
      setUsername('');
    }
  };

  const handleSelect = (id) => {
    setSelectedUser(id);
    onUserSelect(id);
  };

  return (
    <div className="mb-5 text-center">
      <h3 className="text-light mb-3">Select a User</h3>
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {users.map((user) => (
          <button
            key={user._id}
            className={`btn ${
              selectedUser === user._id ? 'btn-primary' : 'btn-outline-light'
            }`}
            onClick={() => handleSelect(user._id)}
          >
            {user.username}
          </button>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 mt-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Add new user"
          className="form-control w-auto"
        />
        <button className="btn btn-success" onClick={handleAddUser}>
          Add
        </button>
      </div>
    </div>
  );
};

export default UserSelector;
