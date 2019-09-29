import React from 'react'
import PropTypes from 'prop-types'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import { DateTime } from 'luxon'
import 'react-vertical-timeline-component/style.min.css'
import Tag from './Tag.js'

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

const Timeline = ({ data }) => {
  return (
    <div>
      <VerticalTimeline
        animate={true}
        layout="2-columns"
        className="custom-vertical-timeline"
      >
        {data
          .sort((a, b) =>
            DateTime.fromSQL(a.created) > DateTime.fromSQL(b.created) ? -1 : 1
          )
          .map(item => (
            <VerticalTimelineElement
              className=""
              contentStyle={styles.default.content}
              contentArrowStyle={styles.default.arrow}
              iconStyle={styles.default.icon}
              position="right"
              date={DateTime.fromSQL(item.created).toFormat('dd.LL.y T')}
            >
              {item.keywords
                .sort((a, b) => b.tfidf - a.tfidf)
                .map(keyword => (
                  <Tag
                    key={item.id + '' + keyword.word}
                    text={keyword.word}
                    size={keyword.tfidf}
                  />
                ))}
            </VerticalTimelineElement>
          ))}
      </VerticalTimeline>
      s
    </div>
  )
}

Timeline.propTypes = {}

export default Timeline
