import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core'
import 'react-vis/dist/style.css'
import VotesDialogContentCreator from './VotesDialogContentCreator'
import VotesDialogLegend from './VotesDialogLegend'
import shortid from 'shortid'

const useStyles = makeStyles(theme => {
  return {
    root: {},
    donutPlot: {},
    xyPlot: {},
  }
})

const diagramColors = {
  for: '#145ba3',
  against: '#b354aa',
  away: '#ff5c6e',
  empty: '#ffa600',
}

const voteTypes = {
  for: 'jaa (yes)',
  against: 'ei (no)',
  away: 'poissa (away)',
  empty: 'tyhjiä (empty)',
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
        scroll={'paper'}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setDialogOpen(false)}
        >
          Votes distribution
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" gutterBottom>
            {data.decision}
          </Typography>
          <br />
          <br />
          {data.votes.map(vote => (
            <VotesDialogContentCreator
              key={vote.session + '_' + shortid.generate()}
              voteTypes={voteTypes}
              diagramColors={diagramColors}
              data={vote.distribution}
              annuled={vote.annulled}
              classes={classes}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <VotesDialogLegend
            voteTypes={voteTypes}
            diagramColors={diagramColors}
          />
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
