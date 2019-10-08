import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => {
  return {
    tooltip: {
      padding: theme.spacing(1),
    },
    tooltipValue: {
      lineHeight: 'unset',
    },
  }
})

const VotesDialogBarChartHint = ({ data, barChartHint, voteTypes }) => {
  const classes = useStyles()

  if (barChartHint) {
    return (
      <Paper className={classes.tooltip} elevation={8}>
        <Typography variant="subtitle1">{barChartHint.y}</Typography>
        {Object.entries(
          data.filter(item => item.group === barChartHint.y)[0]['vote_counts']
        ).map((item, id) => (
          <Typography
            variant="overline"
            component="p"
            key={id}
            className={classes.tooltipValue}
          >
            {voteTypes[item[0]]}: <b>{item[1]}</b>
          </Typography>
        ))}
      </Paper>
    )
  } else {
    return ''
  }
}

VotesDialogBarChartHint.propTypes = {}

export default VotesDialogBarChartHint
