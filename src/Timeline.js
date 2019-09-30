import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
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
      boxShadow:
        '0 0 0 4px #000, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
    },
  },
}

const Timeline = ({ dataType, aggregated, timeFormat }) => {
  const data = useMemo(() => getData(dataType), [dataType])

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
            position="right"
          >
            <h3 className="vertical-timeline-element-title">
              {aggregated
                ? DateTime.fromISO(item.created).toFormat(timeFormat)
                : DateTime.fromSQL(item.created).toFormat(timeFormat)}
            </h3>

            {item.keywords
              .sort((a, b) => b.tfidf - a.tfidf)
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
