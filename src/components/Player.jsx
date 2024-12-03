import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const playerName = useRef();
  let [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClk() {
    setEnteredPlayerName(playerName.current.value); //It'll take input value from user and set to the " enteredPlayerName ".
    playerName.current.value = ""; //It'll reset the the input value into blank.
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "Unknown Player"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClk}>Set Name</button>
      </p>
    </section>
  );
}
