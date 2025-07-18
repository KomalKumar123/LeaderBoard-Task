import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Leaderboard.css';

const Leaderboard = ({ users, recentClaimedUserId }) => {
  if (!users || users.length === 0) return null;

  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  const rankMedals = ['🥇', '🥈', '🥉'];
  const podiumHeights = ['100px', '80px', '60px'];

  return (
    <div className="card leaderboard-container p-4">
      <h2 className="text-center mb-4">🏆 Top Players</h2>

      {/* TOP 3 PODIUM */}
      <div className="d-flex justify-content-around align-items-end podium mb-4">
        {[1, 0, 2].map((i) => {
          const user = topThree[i];
          if (!user) return <div key={i} />;

          return (
            <motion.div
              key={user._id}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="avatar-circle"
                style={{
                  backgroundColor: recentClaimedUserId === user._id ? '#61dafb' : '#6a11cb',
                  transform: recentClaimedUserId === user._id ? 'scale(1.2)' : 'scale(1.0)',
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="fw-bold mt-2">{user.username}</div>
              <div style={{ fontSize: '0.9rem' }}>
                {rankMedals[i]} {user.totalPoints} pts
              </div>
              <div
                className="podium-block"
                style={{
                  height: podiumHeights[i],
                  background: `linear-gradient(135deg, #2575fc, #6a11cb)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* OTHER USERS */}
      {others.length > 0 && (
        <>
          <h3 className="text-light mb-3">Leaderboard</h3>
          <div className="overflow-auto" style={{ maxHeight: '250px' }}>
            <table className="table table-dark table-hover text-center">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {others.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{
                        opacity: 1,
                        y: recentClaimedUserId === user._id ? [-10, 0] : 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        type: 'spring',
                      }}
                    >
                      <td>{index + 4}</td>
                      <td>{user.username}</td>
                      <td>{user.totalPoints}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
