import React from 'react'
import { RadialChart } from 'react-vis'
import { getTotalDistribution } from './voteUtils'

const processDataForTotalDiagram = (data, diagramColors, voteTypes) => {
  return Object.keys(data).map(item => ({
    label: String(data[item]),
    color: diagramColors[item],
    angle: data[item],
  }))
}

const VotesDialogRadialChart = ({ data, diagramColors, voteTypes }) => {
  return (
    <RadialChart
      colorType="literal"
      animation={true}
      data={processDataForTotalDiagram(
        getTotalDistribution(data),
        diagramColors,
        voteTypes
      )}
      width={320}
      height={300}
      margin={{ left: 30, right: 30, top: 20, bottom: 20 }}
      innerRadius={80}
      radius={130}
      padAngle={0.04}
      showLabels={true}
      labelsRadiusMultiplier={1.2}
      labelsStyle={{ fontSize: 14 }}
    />
  )
}

VotesDialogRadialChart.propTypes = {}

export default VotesDialogRadialChart
