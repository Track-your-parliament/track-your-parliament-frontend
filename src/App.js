import React from 'react'
import data from './data.json'
import Timeline from './Timeline.js'
import ApplicationBar from './ApplicationBar'
import { Container } from '@material-ui/core'
import NavigationBar from './NavigationBar.js'

const App = () => {
  return (
    <div className="App">
      <ApplicationBar />
      <Container>
        <Timeline data={data} />
      </Container>
      <NavigationBar />
    </div>
  )
}

export default App
