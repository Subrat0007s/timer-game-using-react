import React, { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef(); //Value inside timer will not going to lost even after re-rendering the TimerChanllenge funtion.
  // It'll help to start the timer and stop the timer without geting any error.

  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerisActive =
    timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
    timerisActive;
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p id="challenge-time">
          {targetTime} second {targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerisActive ? handleStop : handleStart}>
            {timerisActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerisActive ? "active" : undefined}>
          {timerisActive ? "Time is running..." : "Timer In-active."}
        </p>
      </section>
    </>
  );
};
