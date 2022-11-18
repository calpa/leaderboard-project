import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './App.css';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: `chat/startConnecting`
    })
  }, [dispatch])

  return (
    <div className="App">
      Leaderboard
    </div>
  );
}

export default App;
