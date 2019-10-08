import React, { useState } from 'react'
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalBarSeries,
  Hint,
} from 'react-vis'
import VotesDialogBarChartHint from './VotesDialogBarChartHint'

const VotesDialogBarChart = ({ voteTypes, diagramColors, data }) => {
  const [barChartHint, setBarChartHint] = useState(null)

  return (
    <FlexibleWidthXYPlot
      colorType="literal"
      height={300}
      stackBy="x"
      yType="ordinal"
      margin={{ left: 250 }}
    >
      <XAxis style={{ text: { fontSize: '12px' } }} />
      <YAxis style={{ text: { fontSize: '12px' } }} />
      {Object.keys(voteTypes).map(voteType => (
        <HorizontalBarSeries
          key={voteType}
          data={data.reverse().map(item => ({
            y: item.group,
            color: diagramColors[voteType],
            x: item.vote_counts[voteType],
          }))}
          onValueMouseOver={v => setBarChartHint(v)}
          onSeriesMouseOut={v => setBarChartHint(null)}
        />
      ))}
      {barChartHint && (
        <Hint value={barChartHint}>
          <VotesDialogBarChartHint
            barChartHint={barChartHint}
            data={data}
            voteTypes={voteTypes}
          />
        </Hint>
      )}
    </FlexibleWidthXYPlot>
  )
}

VotesDialogBarChart.propTypes = {}

export default VotesDialogBarChart
