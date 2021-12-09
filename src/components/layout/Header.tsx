import * as React from 'react';

import ArrowLink from '../links/ArrowLink';

export default function Header({
  day,
  ...props
}: { day: number } & React.HTMLAttributes<HTMLElement>) {
  return (
    <header {...props}>
      <ArrowLink direction='left' className='fixed top-5 left-10' href='/'>
        Back to Home
      </ArrowLink>
      <h1 className='fixed top-5 right-10'>Advent Of Code</h1>
      <h2 className='fixed right-10 top-16'>Day {day}</h2>
    </header>
  );
}
