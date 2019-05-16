import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div style={{height:'80vh !important'}} className="mt-4">
      <img
        src={spinner}
        style={{ width: '200px', display: 'block', margin: 'auto' }}
        alt="Loading..."
      />
    </div>
  );
};
