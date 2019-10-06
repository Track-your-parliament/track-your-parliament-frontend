import React, { useMemo } from 'react'
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
import initialData from './data/proposals_keywords_distributions.json'

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
  const dateParam = queryParams.get('date')
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')

  if (dateParam) {
    return data.filter(
      item => DateTime.fromSQL(item.date).toISODate === dateParam
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

const PerDocumentTimeline = ({ searchFilter }) => {
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
          DateTime.fromSQL(a.created) > DateTime.fromSQL(b.created) ? -1 : 1
        )
        .map(item => (
          <VerticalTimelineElement
            key={item.id}
            className={classes.timelineelement}
            contentStyle={timelineStyles.default.content}
            contentArrowStyle={timelineStyles.default.arrow}
            iconStyle={timelineStyles.alternative.icon}
            position="right"
          >
            <h3 className={classes.time}>
              {DateTime.fromSQL(item.created).toFormat('DDD T')}
            </h3>

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

PerDocumentTimeline.propTypes = {}

export default PerDocumentTimeline
