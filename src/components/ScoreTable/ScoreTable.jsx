import { Button, Input, Table } from 'antd';
import React from 'react';
import { AiOutlineCrown } from 'react-icons/ai';

export const ScoreTable = () => {
  const [players, setPlayers] = React.useState([]);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [saving, setSaving] = React.useState(false);

  function saveValue(record, column) {
    const gameScore = JSON.parse(localStorage.getItem('gameScore'));
    gameScore[record.key][column.dataIndex] = record[column.dataIndex];
    localStorage.setItem('gameScore', JSON.stringify(gameScore));
    setSaving(true);
  }

  const renderEditableCell = (text, record, column) => {
    const isEditing = editingIndex === record.key && column.editable;
    return isEditing && !saving ? (
      <Input
        defaultValue={text}
        style={{
          width: 50,
        }}
        id={column.dataIndex}
        onChange={(e) => {
          record[column.dataIndex] = e.target.value;
        }}
        onBlur={() => saveValue(record, column)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            saveValue(record, column);
          }
        }}
      />
    ) : (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{text || '-'}</div>
    );
  };

  const rowClassName = (record, index) => {
    return editingIndex === index ? 'editing-row' : '';
  };

  React.useEffect(() => {
    const gameScore = JSON.parse(localStorage.getItem('gameScore'));
    const players = [];
    if (gameScore) {
      gameScore.forEach((player, index) => {
        players.push({
          key: index,
          player: player.playerName,
          game1: player.game1,
          game2: player.game2,
          game3: player.game3,
        });
      });
    }
    setPlayers(players);
  }, [saving]);

  function totalPerPlayer(record) {
    const scores = Object.keys(record).filter((property) => property !== 'player' && property !== 'key');
    const values = scores.map((score) => +record[score]);
    const total = values.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return total;
  }

  const columns = [
    {
      title: 'Player',
      dataIndex: 'player',
      key: 'player',
      render: (text, record, index) => {
        const array = JSON.parse(localStorage.getItem('gameScore'));
        const totalPerPlayer = array.map((item) => {
          const game1 = Number(item['game1']);
          const game2 = Number(item['game2']);
          const game3 = Number(item['game3']);
          const playerName = item.playerName;
          return {
            playerName,
            playerTotal: game1 + game2 + game3,
          };
        });
        const totals = totalPerPlayer.map((item) => item.playerTotal);
        const greatestScore = Math.min(...totals);
        const currentWinner = totalPerPlayer.find((obj) => obj.playerTotal === greatestScore);
        return (
          <span>
            {currentWinner.playerName === text && (
              <AiOutlineCrown
                style={{
                  transform: 'rotate(-40deg)',
                  marginTop: '-8px',
                  marginLeft: '-12px',
                  position: 'absolute',
                }}
              />
            )}
            {text}
          </span>
        );
      },
    },
    {
      title: 'Game 1',
      dataIndex: 'game1',
      key: 'game1',
      editable: true,
      render: (text, record) => renderEditableCell(text, record, columns[1]),
    },
    {
      title: 'Game 2',
      dataIndex: 'game2',
      key: 'game3',
      editable: true,
      render: (text, record) => renderEditableCell(text, record, columns[2]),
    },
    {
      title: 'Game 3',
      dataIndex: 'game3',
      key: 'game3',
      editable: true,
      render: (text, record) => renderEditableCell(text, record, columns[3]),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => totalPerPlayer(record),
    },
  ];

  const handleRowClick = (record) => {
    setSaving(false);
    setEditingIndex(record.key);
  };

  function resetValues() {
    const values = JSON.parse(localStorage.getItem('gameScore'));
    const newValues = values.map((value) => {
      const properties = Object.keys(value).filter((prop) => prop !== 'playerName');
      properties.forEach((item) => {
        value[item] = 0;
      });
      return value;
    });
    localStorage.setItem('gameScore', JSON.stringify(newValues));
    //TODO: This is not working !!
    //setSaving(true);
  }
  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={players}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record);
          },
        })}
        rowClassName={rowClassName}
      />
      <Button onClick={resetValues}>Reset Values</Button>
    </>
  );
};
