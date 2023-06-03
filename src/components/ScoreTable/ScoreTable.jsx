import { Input, Table } from 'antd';
import React from 'react';

export const ScoreTable = () => {
  const [players, setPlayers] = React.useState([]);
  const [editingIndex, setEditingIndex] = React.useState(null);

  const renderEditableCell = (text, record, column) => {
    const isEditing = editingIndex === record.key && column.editable;
    return isEditing ? (
      <Input
        defaultValue={text}
        id={column.dataIndex}
        onChange={(e) => {
          record[column.dataIndex] = e.target.value;
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            const gameScore = JSON.parse(localStorage.getItem('gameScore'));
            gameScore[record.key][column.dataIndex] = record[column.dataIndex];
            localStorage.setItem('gameScore', JSON.stringify(gameScore));
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
    const players = [];
    const gameScore = JSON.parse(localStorage.getItem('gameScore'));
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
  }, []);

  const columns = [
    {
      title: 'Player',
      dataIndex: 'player',
      key: 'player',
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
  ];

  const handleRowClick = (record) => {
    setEditingIndex(record.key);
  };
  return (
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
  );
};
