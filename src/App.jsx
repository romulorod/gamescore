import React from 'react';
import './App.css';
import { PlayerNames } from './components/PlayerNames/PlayerNames';
import { Button, Space } from 'antd';
import { ScoreContainer } from './components/ScoreTable/ScoreContainer';

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
              className='btn'
              onClick={() => {
                setStart(false);
                setShowPlayerNames(true);
              }}
            >
              Start New Game!
            </Button>
            <Button
              className='btn'
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
      {!start && !showPlayerNames && <ScoreContainer setStart={setStart} />}
    </>
  );
}

export default App;
