import React, { useMemo } from 'react'
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
import initialData from './data/top_keywords_by_day.json'

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

const filterDataWithUrl = (data, queryParams) => {
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')

  if (yearParam && monthParam) {
    return data.filter(
      item =>
        DateTime.fromSQL(item.date).year === Number(yearParam) &&
        DateTime.fromSQL(item.date).month === Number(monthParam)
    )
  }
  return data
}

const PerDayTimeline = params => {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const queryParams = new URLSearchParams(location.search)
  const data = useMemo(() => filterDataWithUrl(initialData, queryParams), [
    queryParams,
  ])

  const iconClickHandler = date => {
    history.push('/vote?date=' + date)
  }

  return (
    <VerticalTimeline
      animate={true}
      layout="1-column"
      className={classes.timeline}
    >
      {data.map(item => (
        <VerticalTimelineElement
          key={DateTime.fromSQL(item.date).toISODate()}
          className={classes.timelineElement}
          contentStyle={timelineStyles.default.content}
          contentArrowStyle={timelineStyles.default.arrow}
          iconStyle={timelineStyles.default.icon}
          iconOnClick={() =>
            iconClickHandler(DateTime.fromSQL(item.date).toISODate())
          }
          position="right"
        >
          <h3 className={classes.time}>
            {DateTime.fromSQL(item.date).toFormat('DDD')}
          </h3>

          {item.keywords_list.map((keyword, i) => (
            <Tag
              key={
                DateTime.fromSQL(item.date).toISODate() +
                '_tag_' +
                shortid.generate()
              }
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

PerDayTimeline.propTypes = {}

export default PerDayTimeline
