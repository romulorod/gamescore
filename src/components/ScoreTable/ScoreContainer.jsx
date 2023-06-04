import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import { AiOutlineCrown } from 'react-icons/ai';
import { ScoreTable } from './ScoreTable';

export const ScoreContainer = ({ setStart }) => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  function updateData() {
    const nextData = JSON.parse(localStorage.getItem('gameScore')).map((player) => {
      const { playerName, game1, game2, game3 } = player;
      return {
        playerName,
        game1,
        game2,
        game3,
      };
    });
    setData(nextData);
  }

  React.useEffect(() => {
    const gameScore = JSON.parse(localStorage.getItem('gameScore'));
    if (gameScore) {
      updateData();
    }
  }, []);

  function saveValue(record, column) {
    const gameScore = JSON.parse(localStorage.getItem('gameScore'));
    const editedPlayer = gameScore.find((player) => player.playerName === record.playerName);
    editedPlayer[column.dataIndex] = record[column.dataIndex];
    localStorage.setItem('gameScore', JSON.stringify(gameScore));
    console.log(JSON.parse(localStorage.getItem('gameScore')));
    setEditingIndex(null);
    updateData();
  }

  const renderEditableCell = (text, record, column) => {
    const isEditing = editingIndex === record.key && column.editable;
    return isEditing ? (
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

  function totalPerPlayer(record) {
    const scores = Object.keys(record).filter((property) => property !== 'playerName' && property !== 'key');
    const values = scores.map((score) => +record[score]);
    const total = values.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return total;
  }

  const columns = [
    {
      title: 'Player',
      dataIndex: 'playerName',
      key: 'playerName',
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
    updateData();
  }

  function isScoreZero() {
    const values = data.map((item) => Object.values(item).filter((value) => typeof value === 'number')).flat();

    const isZero = values.every((value) => value === 0);
    return isZero;
  }

  return (
    <>
      <ScoreTable columns={columns} data={data} handleRowClick={handleRowClick} rowClassName={rowClassName} />
      <br />
      <Row align='middle' justify='space-between'>
        <Col>
          <Button className='btn' onClick={() => setStart(true)}>
            Go Back
          </Button>
        </Col>
        <Col>
          <Button className='btn' onClick={resetValues} disabled={isScoreZero()}>
            Reset Values
          </Button>
        </Col>
      </Row>
    </>
  );
};
