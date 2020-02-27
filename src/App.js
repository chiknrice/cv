import React from 'react';

function App() {
  fetch('cv.yaml')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(e => console.error(e));
  return <div className="App">test</div>;
}

export default App;
