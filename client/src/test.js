import React from 'react';

const noop = () => {};
export default ({onClick} = noop) => {
  <div>
    <button className="btnname" onClick={onClick}>Hello</button>
  </div>
}
