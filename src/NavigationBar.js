import React, { useState } from 'react'
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

const NavigationBar = props => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  return (
    <Paper className={classes.root} elevation={8}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Per document"
          icon={<DescriptionIcon />}
        />
        <BottomNavigationAction label="Per day" icon={<DateRangeIcon />} />
        <BottomNavigationAction label="Per month" icon={<DateRangeIcon />} />
        <BottomNavigationAction label="Per year" icon={<DateRangeIcon />} />
      </BottomNavigation>
    </Paper>
  )
}

NavigationBar.propTypes = {}

export default NavigationBar
