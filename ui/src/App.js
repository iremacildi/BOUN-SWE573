import { useState, useEffect } from 'react'
import './App.css';
import TestComponent from './Components/TestComponent'

function App() {
  const [text, setText] = useState();
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/test', {
      'methods': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => setText(response))
      .catch(error => console.log(error))

  }, [])

  return (
    <div className="App container m-4">
      <div className="row">
        <div className="text-center">
          <h1>Connecting a React Frontend to a Flask Backend</h1>
        </div>
      </div>
      <button onClick={() => setTextVisible(!textVisible)}>Click</button>
      {textVisible ? <TestComponent text={text} /> : ""}
    </div>
  );
}

export default App;