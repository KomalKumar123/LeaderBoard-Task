import React, { useState, useEffect } from 'react';
import { getUsers, createUser, claimPoints, getClaimHistory } from './api';
import { motion } from 'framer-motion';

import UserSelector from './components/UserSelector';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';

function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hist, setHist] = useState([]);
  const [claimMsg, setClaimMsg] = useState('');
  const [recentClaimedUserId, setRecentClaimedUserId] = useState(null); // 👈 new

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSelect = async (id) => {
    setSelected(id);
    const res = await getClaimHistory(id);
    setHist(res.data);
  };

  const onAdd = async (name) => {
    await createUser(name);
    fetchUsers();
  };

  const onClaim = async () => {
    if (!selected) return;
    const res = await claimPoints(selected);
    setClaimMsg(`+${res.data.pointsAdded} pts!`);
    setRecentClaimedUserId(selected); // 👈 trigger animation highlight
    await fetchUsers();
    await onSelect(selected);

    setTimeout(() => {
      setClaimMsg('');
      setRecentClaimedUserId(null); // 👈 remove highlight
    }, 2000);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-5 text-light display-4 fw-bold">
        🎯 Claim Points App
      </h1>

      <UserSelector users={users} onUserSelect={onSelect} onAddUser={onAdd} />

      <div className="text-center my-4">
        {selected && (
          <div className="text-center my-3">
            <h4 className="text-info">
              Selected User:{' '}
              <span className="fw-bold">
                {users.find((u) => u._id === selected)?.username}
              </span>
            </h4>
            <button className="btn btn-success mt-2" onClick={onClaim}>
              Claim Points
            </button>
          </div>
        )}
      </div>

      {claimMsg && (
        <div className="d-flex justify-content-center mb-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="alert alert-success">{claimMsg}</div>
          </motion.div>
        </div>
      )}

      <Leaderboard users={users} recentClaimedUserId={recentClaimedUserId} />

      {selected && <ClaimHistory history={hist} />}
    </div>
  );
}

export default App;
