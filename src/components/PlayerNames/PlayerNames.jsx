import React from 'react';

export const PlayerNames = ({ setShowPlayerNames }) => {
  function capitalizeName(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target.elements;

    const players = [...form].reduce((acc, curr) => {
      if (curr.type === 'text' && curr.value) {
        acc.push({ playerName: capitalizeName(curr.value), game1: 0, game2: 0, game3: 0 });
      }
      return acc;
    }, []);
    localStorage.setItem('gameScore', JSON.stringify(players));

    setShowPlayerNames(false);
  }

  return (
    <>
      <h3>Please input the player names:</h3>
      <form onSubmit={onSubmit} className='vertical-form'>
        <label htmlFor='player1'>Player 1:</label>
        <input type='text' id='player1' name='player1' />
        <label htmlFor='player2'>Player 2:</label>
        <input type='text' id='player2' name='player2' />
        <label htmlFor='player3'>Player 3:</label>
        <input type='text' id='player3' name='player3' />
        <label htmlFor='player4'>Player 4:</label>
        <input type='text' id='player4' name='player4' />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};
