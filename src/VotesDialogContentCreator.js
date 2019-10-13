import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import 'react-vis/dist/style.css'
import VotesDialogBarChart from './VotesDialogBarChart'
import VotesDialogRadialChart from './VotesDialogRadialChart'

const VotesDialogContentCreator = ({
  voteTypes,
  diagramColors,
  data,
  annulled,
  classes,
}) => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={classes.title} gutterBottom>
            {Number(annulled) === 1 ? (
              <span style={{ color: 'red' }}>ANNULLED</span>
            ) : (
              <span>Total</span>
            )}
          </Typography>
          <VotesDialogRadialChart
            data={data}
            voteTypes={voteTypes}
            diagramColors={diagramColors}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" className={classes.title} gutterBottom>
            Per party
          </Typography>
          <VotesDialogBarChart
            data={data}
            voteTypes={voteTypes}
            diagramColors={diagramColors}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default VotesDialogContentCreator
