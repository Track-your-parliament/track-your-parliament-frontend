import React from 'react'
import data from './proposals_keywords_distributions.json'
import Timeline from './Timeline.js'

const App = () => {
  return (
    <div className="App">
      <Timeline data={data} />
    </div>
  )
}

export default App
