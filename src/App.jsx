import React from 'react';
import './App.css';
import { PlayerNames } from './components/PlayerNames/PlayerNames';
import { ScoreTable } from './components/ScoreTable/ScoreTable';

function App() {
  const [showPlayerNames, setShowPlayerNames] = React.useState(false);
  const [start, setStart] = React.useState(true);
  return (
    <>
      {start && (
        <>
          <p>Welcome to the Card Game Score!</p>
          <button
            onClick={() => {
              setStart(false);
              setShowPlayerNames(true);
            }}
          >
            Start!
          </button>
        </>
      )}
      {showPlayerNames && <PlayerNames setShowPlayerNames={setShowPlayerNames} />}
      {!start && !showPlayerNames && <ScoreTable />}
    </>
  );
}

export default App;
