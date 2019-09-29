import React from 'react'
import data from './data.json'
import Timeline from './Timeline.js'

const App = () => {
  return (
    <div className="App">
      <Timeline data={data} />
    </div>
  )
}

export default App
