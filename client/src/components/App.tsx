import React from 'react';
import './App.css';

const App = (props: { data: { message: string } }) => {
  return (
    <div>
      <h1>Welcome to my app page</h1>
      <p>/app</p>
      <p>{props.data.message}</p>
    </div>
  );
};

export default App;
