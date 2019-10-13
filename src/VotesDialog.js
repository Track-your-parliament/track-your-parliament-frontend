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
          <VotesDialogLegend
            voteTypes={voteTypes}
            diagramColors={diagramColors}
          />
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
