import React from 'react';

export default function Solution({
  part,
  children,
  ...props
}: {
  part: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <div className='flex my-3 rounded border border-primary-800' {...props}>
      <h3 className='flex items-center p-3 text-white bg-primary-800'>
        Part {part}
      </h3>
      <p className='flex items-center p-3'>
        <span>{children}</span>
      </p>
    </div>
  );
}
