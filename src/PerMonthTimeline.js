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
import initialData from './data/top_keywords_by_month.json'

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
  if (yearParam) {
    return data.filter(item => item.year === Number(yearParam))
  }
  return data
}

const PerMonthTimeline = params => {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const queryParams = new URLSearchParams(location.search)
  const data = useMemo(() => filterDataWithUrl(initialData, queryParams), [
    queryParams,
  ])

  const iconClickHandler = (year, month) => {
    history.push('/day?year=' + year + '&month=' + month)
  }
  return (
    <VerticalTimeline
      animate={true}
      layout="1-column"
      className={classes.timeline}
    >
      {data.map(item => (
        <VerticalTimelineElement
          key={item.year + '-' + item.month}
          className={classes.timelineelement}
          contentStyle={timelineStyles.default.content}
          contentArrowStyle={timelineStyles.default.arrow}
          iconStyle={timelineStyles.default.icon}
          iconOnClick={() => iconClickHandler(item.year, item.month)}
          position="right"
        >
          <h3 className={classes.time}>
            {DateTime.fromObject({
              year: item.year,
              month: item.month,
            }).toFormat('LLLL y')}
          </h3>

          {item.keywords_list.map((keyword, i) => (
            <Tag
              key={item.year + '-' + item.month + '_tag_' + shortid.generate()}
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

PerMonthTimeline.propTypes = {}

export default PerMonthTimeline
