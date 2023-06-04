import React from 'react';
import { Table } from 'antd';

export const ScoreTable = ({ columns, data, handleRowClick, rowClassName }) => {
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => {
          handleRowClick(record);
        },
      })}
      rowClassName={rowClassName}
      rowKey={(record) => record.playerName}
    />
  );
};
