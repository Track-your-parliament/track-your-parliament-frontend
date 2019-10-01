import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import shortid from 'shortid'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import { DateTime } from 'luxon'
import 'react-vertical-timeline-component/style.min.css'
import Tag from './Tag.js'
import data from './data.json'
import {
  sortByDate,
  aggregateByDay,
  aggregateByMonth,
  aggregateByYear,
} from './dataUtils'

const styles = {
  default: {
    content: {
      padding: 0,
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      color: '#fff',
    },
    arrow: {
      borderRight: 'none',
    },
    icon: {
      background: '#18447e',
      cursor: 'pointer',
      boxShadow:
        '0 0 0 4px #000, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
    },
  },
}

const getData = dataType => {
  switch (dataType) {
    case 'document':
      return sortByDate(data)
    case 'day':
      return aggregateByDay(data)
    case 'month':
      return aggregateByMonth(data)
    case 'year':
      return aggregateByYear(data)
    default:
      break
  }
}

const filterData = (data, dataType, queryParams) => {
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')
  const dayParam = queryParams.get('day')
  const documentParam = queryParams.get('document')

  const year = yearParam !== null ? Number(yearParam) : null
  const month = monthParam !== null ? Number(monthParam) : null
  const day = dayParam !== null ? dayParam : null
  const document = documentParam !== null ? documentParam : null

  if (dataType === 'document' && document) {
    return data.filter(item => item.id === document)
  } else if (dataType === 'document' && day) {
    return data.filter(
      item => DateTime.fromSQL(item.created).toISODate() === day
    )
  } else if (dataType === 'day' && year && month) {
    return data.filter(
      item =>
        DateTime.fromISO(item.created).month === month &&
        DateTime.fromISO(item.created).year === year
    )
  } else if (dataType === 'month' && year) {
    return data.filter(item => DateTime.fromISO(item.created).year === year)
  } else {
    return data
  }
}

const Timeline = ({ dataType, aggregated, timeFormat, setShowLoading }) => {
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const data = useMemo(
    () => filterData(getData(dataType), dataType, queryParams),
    [dataType, queryParams]
  )

  const redirectToView = date => {
    setShowLoading(true)
    setTimeout(() => setShowLoading(false), 1000)

    if (dataType === 'day') {
      const day = DateTime.fromISO(date).toISODate()
      return history.push('/document?day=' + day)
    } else if (dataType === 'month') {
      const year = DateTime.fromISO(date).year
      const month = DateTime.fromISO(date).month
      return history.push('/day?year=' + year + '&month=' + month)
    } else if (dataType === 'year') {
      const year = DateTime.fromISO(date).year
      return history.push('/month?year=' + year)
    } else {
      return history.push('/document')
    }
  }

  return (
    <div>
      <VerticalTimeline
        animate={true}
        layout="1-column"
        className="custom-vertical-timeline"
      >
        {data.map(item => (
          <VerticalTimelineElement
            key={item.id}
            className="custom-vertical-timeline-element"
            contentStyle={styles.default.content}
            contentArrowStyle={styles.default.arrow}
            iconStyle={styles.default.icon}
            iconOnClick={() => redirectToView(item.created)}
            position="right"
          >
            <h3 className="vertical-timeline-element-title">
              {aggregated
                ? DateTime.fromISO(item.created).toFormat(timeFormat)
                : DateTime.fromSQL(item.created).toFormat(timeFormat)}
            </h3>

            {item.keywords
              .sort((a, b) => b.tfidf - a.tfidf)
              .slice(0, 20)
              .map(keyword => (
                <Tag
                  key={item.id + '_tag_' + shortid.generate()}
                  text={keyword.word}
                  size={keyword.tfidf}
                />
              ))}
            <br />
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

Timeline.propTypes = {}

export default Timeline
