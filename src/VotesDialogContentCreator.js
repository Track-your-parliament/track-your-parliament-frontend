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

const VotesDialogContentCreator = ({ data, annulled, classes }) => {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <Typography
                        variant="subtitle1"
                        className={classes.title}
                        gutterBottom
                    >
                        {Number(annulled) === 1 ? <h3 style={{ color: 'red' }}>ANNULLED</h3> : <h3>Total</h3>}
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
                        <h3>Per party</h3>
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
        </div>
    )
}

export default VotesDialogContentCreator