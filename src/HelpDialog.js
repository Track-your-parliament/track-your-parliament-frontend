import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import votesButtonImage from './data/votesButton.png'
import zoomButtonImage from './data/zoomButton.png'
import tagImage from './data/tag.png'
import searchImage from './data/search.png'
import votesImage from './data/votes.png'

const HelpDialog = ({ dialogOpen, setDialogOpen }) => {
  return (
    <div>
      <Dialog
        onClose={() => setDialogOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        fullWidth={true}
        maxWidth={'md'}
        scroll={'paper'}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setDialogOpen(false)}
        >
          Instructions
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h5">Navigating between views</Typography>
          <Typography variant="body1">
            The application is based on views summarizing the relevant keywords
            in parliament during a certain period of time in timeline format.
            When the application is first opened the "Per year" view is showed
            initially. By clicking the blue button (shown below) next to the
            year allows you to dig into that year in more detail and show the
            summary of keywords on monthly basis. This same logic applies on
            monthly view where clicking the blue button shows the summary of
            keywords on daily basis. When you are browsing the daily view,
            clicking the blue button allows you the see the individual proposals
            on that day.
          </Typography>
          <img src={zoomButtonImage} alt="zoom button" width={50} />
          <br />
          <br />

          <Typography variant="h5">View the voting data</Typography>
          <Typography variant="body1">
            When you find a proposal that you are interested in, you can press
            the "VOTES" button underneath the summary, or click the bullet next
            to the proposal, to open a window showcasing the voting data of that
            proposal.
          </Typography>
          <img src={votesButtonImage} alt="votes button" width={80} />

          <Typography variant="body1">
            Opening the votes window shows all the voting data available for
            individual proposal. For each vote there are two graphs shown. The
            first graph shows the total distribution of votes between the vote
            options (JAA, EI, TYHJÄ and POISSA), and the second graph shows the
            distribution inside every party. Hovering over the charts displays
            details of the chart in a tooltip.
          </Typography>
          <img src={votesImage} alt="search" width={600} />
          <br />
          <ErrorOutlineIcon color="error" className="disclaimer_icon" />
          <div className="disclaimer_content">
            <Typography display="inline" variant="body2">
              One proposal may contain more than one vote due to the nature of
              the Finnish law making process. However, detailed information on
              the specifics of each vote is not available in the used data
              sources.
            </Typography>
          </div>
          <br />

          <Typography variant="h5" gutterBottom>
            Using the search bar
          </Typography>
          <Typography variant="body1">
            You can use the search functionality located on the top right corner
            of the application to find individual proposals which contain the
            keyword you are interested. The minimum keyword length to be
            searched is three letters. The results are shown also on a timeline
            format.
          </Typography>
          <img src={searchImage} alt="search" width={280} />
          <Typography variant="body1">
            Clicking on any keyword on the page will also trigger a search for
            that keyword.
          </Typography>
          <img src={tagImage} alt="tag" width={100} />
          <br />
          <br />
          <Typography variant="subtitle2" gutterBottom>
            Source of data used in the application:
            https://avoindata.eduskunta.fi/
          </Typography>
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

HelpDialog.propTypes = {}

export default HelpDialog
