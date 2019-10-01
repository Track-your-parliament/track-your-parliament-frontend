import React, { useState } from 'react'
import Timeline from './Timeline.js'
import ApplicationBar from './ApplicationBar'
import { Container, CircularProgress } from '@material-ui/core'
import NavigationBar from './NavigationBar.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

const App = () => {
  const [showLoading, setShowLoading] = useState(false)
  const [filter, setFilter] = useState('')

  const searchFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div className="App">
      <Router>
        <ApplicationBar searchFilter={searchFilter} />
        {showLoading && (
          <CircularProgress
            disableShrink
            style={{
              margin: 'auto',
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
        )}
        {!showLoading && (
          <Container>
            <Route
              exact
              path="/"
              render={props => <Redirect {...props} to="/year" />}
            />
            <Route
              path="/day"
              render={props => (
                <Timeline
                  {...props}
                  dataType="day"
                  timeFormat="DDD"
                  aggregated
                  showLoading={showLoading}
                  setShowLoading={setShowLoading}
                  filter={filter}
                />
              )}
            />
            <Route
              path="/month"
              render={props => (
                <Timeline
                  {...props}
                  dataType="month"
                  timeFormat="LLLL y"
                  aggregated
                  showLoading={showLoading}
                  setShowLoading={setShowLoading}
                  filter={filter}
                />
              )}
            />
            <Route
              path="/year"
              render={props => (
                <Timeline
                  {...props}
                  dataType="year"
                  timeFormat="y"
                  aggregated
                  showLoading={showLoading}
                  setShowLoading={setShowLoading}
                  filter={filter}
                />
              )}
            />
            <Route
              path="/document"
              render={props => (
                <Timeline
                  {...props}
                  dataType="document"
                  timeFormat="DDD T"
                  aggregated={false}
                  showLoading={showLoading}
                  setShowLoading={setShowLoading}
                  filter={filter}
                />
              )}
            />
          </Container>
        )}

        <NavigationBar
          showLoading={showLoading}
          setShowLoading={setShowLoading}
        />
      </Router>
    </div>
  )
}

export default App
