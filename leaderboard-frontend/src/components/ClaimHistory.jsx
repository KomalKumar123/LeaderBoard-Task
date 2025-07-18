import React from 'react';

const ClaimHistory = ({ history }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); // This gives both date and time
  };

  return (
    <div className="card bg-dark text-light mt-5 p-4">
      <h3 className="text-center mb-4">📜 Claim History</h3>
      {history.length === 0 ? (
        <p className="text-center text-muted">No claims yet.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {history.map((entry, index) => (
            <li key={index} className="list-group-item bg-dark text-light">
    +{entry.pointsClaimed} pts at {new Date(entry.timestamp).toLocaleString()}
  </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClaimHistory;
