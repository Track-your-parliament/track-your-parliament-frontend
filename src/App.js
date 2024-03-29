import React, { useState, Suspense, lazy } from 'react'
import ApplicationBar from './ApplicationBar'
import { Container, CircularProgress, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavigationBar from './NavigationBar.js'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import 'react-vertical-timeline-component/style.min.css'
import HelpDialog from './HelpDialog'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  container: {
    flexGrow: 1,
  },
  progress: {
    margin: 'auto',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})

const PerDayTimeline = lazy(() => import('./PerDayTimeline'))
const PerMonthTimeline = lazy(() => import('./PerMonthTimeline'))
const PerYearTimeline = lazy(() => import('./PerYearTimeline'))
const PerVoteTimeline = lazy(() => import('./PerVoteTimeline'))

const App = () => {
  const [showLoading, setShowLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(true)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Router>
        <ApplicationBar handleInfoClick={e => setDialogOpen(!dialogOpen)} />

        <Container className={classes.container} maxWidth={false}>
          <Suspense
            fallback={
              <CircularProgress disableShrink className={classes.progress} />
            }
          >
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Redirect {...props} to="/year" />}
              />
              <Route path="/day" component={PerDayTimeline} />
              <Route path="/month" component={PerMonthTimeline} />
              <Route path="/year" component={PerYearTimeline} />
              <Route path="/proposal" component={PerVoteTimeline} />
            </Switch>
          </Suspense>
        </Container>

        <Toolbar variant="dense" />
        <NavigationBar
          showLoading={showLoading}
          setShowLoading={setShowLoading}
        />
        <HelpDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </Router>
    </div>
  )
}

export default App
