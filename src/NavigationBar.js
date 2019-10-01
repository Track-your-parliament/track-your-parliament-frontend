import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import DescriptionIcon from '@material-ui/icons/Description'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
})

const getButtonIndexFromLocation = location => {
  switch (location) {
    case '/year':
      return 0
    case '/month':
      return 1
    case '/day':
      return 2
    case '/document':
      return 3
    default:
      return 0
  }
}

const NavigationBar = ({ showLoading, setShowLoading }) => {
  const classes = useStyles()
  const location = useLocation()
  const [value, setValue] = useState(
    getButtonIndexFromLocation(location.pathname)
  )

  useEffect(() => {
    setValue(getButtonIndexFromLocation(location.pathname))
  }, [location.pathname])

  return (
    <Paper className={classes.root} elevation={8}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setShowLoading(true)
          setTimeout(() => setShowLoading(false), 1000)
          setValue(newValue)
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Per year"
          icon={<DateRangeIcon />}
          component={Link}
          to="/year"
        />
        <BottomNavigationAction
          label="Per month"
          icon={<DateRangeIcon />}
          component={Link}
          to="/month"
        />
        <BottomNavigationAction
          label="Per day"
          icon={<DateRangeIcon />}
          component={Link}
          to="/day"
        />
        <BottomNavigationAction
          label="Per document"
          icon={<DescriptionIcon />}
          component={Link}
          to="/document"
        />
      </BottomNavigation>
    </Paper>
  )
}

NavigationBar.propTypes = {}

export default NavigationBar
