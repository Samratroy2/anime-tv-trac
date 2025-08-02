// src/components/Poll.js

import React, { useState } from 'react';

const Poll = ({ pollData, onVote }) => {
  const [votedOption, setVotedOption] = useState(null);

  const handleVote = (optionIndex) => {
    if (votedOption !== null) return; // Prevent multiple votes
    onVote(optionIndex);
    setVotedOption(optionIndex);
  };

  return (
    <div className="poll-container">
      <h3>{pollData.question}</h3>
      <div className="poll-options">
        {pollData.options.map((option, index) => (
          <div
            key={index}
            className={`poll-option ${votedOption === index ? 'voted' : ''}`}
            onClick={() => handleVote(index)}
          >
            {option.text} - {option.votes} votes
          </div>
        ))}
      </div>
      {votedOption !== null && <p className="thank-you">Thank you for voting!</p>}
    </div>
  );
};

export default Poll;
