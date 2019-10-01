import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import { timelineStyles } from './theme'
import shortid from 'shortid'
import { DateTime } from 'luxon'
import Tag from './Tag'
import initialData from './data/top_keywords_by_year.json'

const useStyles = makeStyles(theme => {
  return {
    root: {},
    timeline: {
      minHeight: '100%',
      '&:before': {
        background: theme.palette.common.black,
      },
    },
    timelineElement: {
      padding: 0,
    },
    time: {
      color: theme.palette.text.primary,
    },
  }
})

const PerYearTimeline = params => {
  const history = useHistory()
  const classes = useStyles()

  const iconClickHandler = year => history.push('/month?year=' + year)

  return (
    <VerticalTimeline
      animate={true}
      layout="1-column"
      className={classes.timeline}
    >
      {initialData.map(item => (
        <VerticalTimelineElement
          key={item.year}
          className={classes.timelineElement}
          contentStyle={timelineStyles.default.content}
          contentArrowStyle={timelineStyles.default.arrow}
          iconStyle={timelineStyles.default.icon}
          iconOnClick={() => iconClickHandler(item.year)}
          position="right"
        >
          <h3 className={classes.time}>
            {DateTime.fromObject({
              year: item.year,
            }).toFormat('y')}
          </h3>

          {item.keywords_list.map((keyword, i) => (
            <Tag
              key={item.year + '_tag_' + shortid.generate()}
              text={keyword}
              size={item.keywords_list.length - i}
            />
          ))}
          <br />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}

PerYearTimeline.propTypes = {}

export default PerYearTimeline
