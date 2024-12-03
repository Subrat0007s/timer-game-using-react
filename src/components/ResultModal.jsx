import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

//forwardRef() let your component receive a ref and forward it to a child component.
//forwardRef accepts a render function as an argument. React calls this function with props and ref.
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  const userlost = remainingTime <= 0;
  const formatted = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userlost && <h2>You Lost. </h2>}
      {!userlost && <h2>Your Score:{score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with
        <strong> {formatted} seconds left.</strong>{" "}
        {/*.toFixed(2) : It will always show the time remaining value upto two decimal. */}
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button> Close </button>
      </form>
    </dialog>
  );
});

export default ResultModal;
