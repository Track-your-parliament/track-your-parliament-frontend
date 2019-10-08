import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => {
  return {
    legendWrapper: {
      marginTop: theme.spacing(2),
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(3),
    },
    legendColorBlock: {
      display: 'inline-block',
      marginRight: theme.spacing(1),
      height: theme.spacing(3),
      width: theme.spacing(5),
    },
  }
})

const VotesDialogLegend = ({ voteTypes, diagramColors }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      item
      xs={12}
      justify={'center'}
      className={classes.legendWrapper}
    >
      {Object.keys(voteTypes).map((voteType, id) => (
        <div className={classes.legendItem} key={id}>
          <div
            className={classes.legendColorBlock}
            style={{ backgroundColor: diagramColors[voteType] }}
          ></div>
          <Typography variant="overline">{voteTypes[voteType]}</Typography>
        </div>
      ))}
    </Grid>
  )
}

VotesDialogLegend.propTypes = {}

export default VotesDialogLegend
