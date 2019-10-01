import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import { timelineStyles } from './theme'
import shortid from 'shortid'
import { DateTime } from 'luxon'
import Tag from './Tag'
import initialData from './data/votes_keywords_distributions.json'

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
    title: {
      color: theme.palette.text.primary,
      paddingLeft: '0.2rem',
      paddingRight: '0.2rem',
      margin: '8px',
    },
    content: {
      color: theme.palette.text.primary,
      paddingLeft: '0.2rem',
      paddingRight: '0.2rem',
      margin: '8px',
    },
  }
})

const filterDataWithUrl = (data, queryParams) => {
  const dateParam = queryParams.get('date')
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')
  const searchParam = queryParams.get('search')

  if (searchParam) {
    return filterWithSearch(data, searchParam)
  } else if (dateParam) {
    return data.filter(
      item => DateTime.fromSQL(item.date).toISODate() === dateParam
    )
  } else if (yearParam && monthParam) {
    return data.filter(
      item =>
        DateTime.fromSQL(item.date).year === Number(yearParam) &&
        DateTime.fromSQL(item.date).month === Number(monthParam)
    )
  }
  return data
}

const filterWithSearch = (data, searchFilter) => {
  if (!searchFilter || searchFilter === '') return data
  return data.filter(item => {
    let found = false
    item.keywords_list.forEach(obj => {
      if (obj.includes(searchFilter)) {
        found = true
      }
    })
    return found
  })
}

const PerVoteTimeline = ({ searchFilter }) => {
  const location = useLocation()
  const classes = useStyles()
  const queryParams = new URLSearchParams(location.search)
  const data = useMemo(() => filterDataWithUrl(initialData, queryParams), [
    queryParams,
  ])

  return (
    <VerticalTimeline
      animate={true}
      layout="1-column"
      className={classes.timeline}
    >
      {filterWithSearch(data, searchFilter)
        .sort((a, b) =>
          DateTime.fromSQL(a.date) > DateTime.fromSQL(b.date) ? -1 : 1
        )
        .map(item => (
          <VerticalTimelineElement
            key={item.id + '_' + item.vote_id}
            className={classes.timelineelement}
            contentStyle={timelineStyles.default.content}
            contentArrowStyle={timelineStyles.default.arrow}
            iconStyle={timelineStyles.alternative.icon}
            position="right"
          >
            <h3 className={classes.time}>
              {DateTime.fromSQL(item.date).toFormat('DDD')} (
              {item.hearing_stage})
            </h3>

            <h4 className={classes.title}> {item.title})</h4>
            <p className={classes.content}>{item.summary}</p>

            {item.keywords_list.map((keyword, i) => (
              <Tag
                key={
                  DateTime.fromSQL(item.created).toISO() +
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

PerVoteTimeline.propTypes = {}

export default PerVoteTimeline
