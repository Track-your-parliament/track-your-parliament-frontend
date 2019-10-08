import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core'
import 'react-vis/dist/style.css'
import VotesDialogLegend from './VotesDialogLegend'
import VotesDialogBarChart from './VotesDialogBarChart'
import VotesDialogRadialChart from './VotesDialogRadialChart'

const useStyles = makeStyles(theme => {
  return {
    root: {},
    donutPlot: {},
    xyPlot: {},
  }
})

const diagramColors = {
  for: '#4caf50',
  against: '#f44336',
  away: '#ff9800',
  empty: '#2196f3',
}

const voteTypes = {
  for: 'jaa',
  against: 'ei',
  away: 'poissa',
  empty: 'tyhjä',
}

const VotesDialog = ({ data, dialogOpen, setDialogOpen }) => {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        onClose={() => setDialogOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setDialogOpen(false)}
        >
          Votes distribution
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="subtitle1"
                className={classes.title}
                gutterBottom
              >
                Total
              </Typography>
              <VotesDialogRadialChart
                data={data}
                voteTypes={voteTypes}
                diagramColors={diagramColors}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="subtitle1"
                className={classes.title}
                gutterBottom
              >
                Per party
              </Typography>
              <VotesDialogBarChart
                data={data}
                voteTypes={voteTypes}
                diagramColors={diagramColors}
              />
            </Grid>
            <VotesDialogLegend
              voteTypes={voteTypes}
              diagramColors={diagramColors}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Hide
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

VotesDialog.propTypes = {}

export default VotesDialog
