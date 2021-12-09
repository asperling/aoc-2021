import React from 'react';

import { Board } from '@/lib/board';

export default function BingoBoard({
  data,
  ...props
}: { data: Board } & React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={`grid grid-cols-5 text-white rounded overflow-hidden ${
        data.winner ? '' : ''
      }`}
      {...props}
    >
      {data.list.map((entry, index) => (
        <div
          key={index}
          className={`${
            entry.matched
              ? 'bg-red-800'
              : data.winner
              ? 'bg-primary-400'
              : 'bg-primary-800'
          }`}
        >
          <div className='p-1'>{entry.number}</div>
        </div>
      ))}
    </div>
  );
}
