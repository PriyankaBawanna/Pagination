import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  // State for time, running status, and interval ID
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Start/Stop functionality
  const toggleStartStop = () => {
    if (isRunning) {
      // Stop the stopwatch
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      // Start the stopwatch
      const newIntervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
    setIsRunning(!isRunning);
  };

  // Reset functionality
  const reset = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
    setIsRunning(false);
  };

  // Cleanup on component unmount (clear interval if still running)
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // Format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <br/>
      <div className="controls">
        <button onClick={toggleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
