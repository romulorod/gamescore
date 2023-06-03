import React from 'react';
import './App.css';
import { PlayerNames } from './components/PlayerNames/PlayerNames';
import { ScoreTable } from './components/ScoreTable/ScoreTable';
import { Button, Space } from 'antd';

function App() {
  const [showPlayerNames, setShowPlayerNames] = React.useState(false);
  const [start, setStart] = React.useState(true);
  return (
    <>
      {start && (
        <>
          <p>Welcome to the Card Game Score!</p>
          <Space>
            <Button
              className='home-button'
              onClick={() => {
                setStart(false);
                setShowPlayerNames(true);
              }}
            >
              Start New Game!
            </Button>
            <Button
              className='home-button'
              disabled={!JSON.parse(localStorage.getItem('gameScore'))}
              onClick={() => {
                setStart(false);
                setShowPlayerNames(false);
              }}
            >
              Load Last Game!
            </Button>
          </Space>
        </>
      )}
      {showPlayerNames && <PlayerNames setShowPlayerNames={setShowPlayerNames} />}
      {!start && !showPlayerNames && <ScoreTable />}
    </>
  );
}

export default App;
