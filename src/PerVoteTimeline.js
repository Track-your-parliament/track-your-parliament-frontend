import React, { useMemo, useState } from 'react'
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
//import initialData from './data/votes_keywords_distributions.json'
import initialData from './data/votes_with_sessions.json'
import PaginationControllers, { paginate } from './PaginationControllers'
import { Typography, Button } from '@material-ui/core'
import { fixJson } from './voteUtils'
import VotesDialog from './VotesDialog'
import { Icon } from 'semantic-ui-react'

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
      margin: theme.spacing(1),
    },
    content: {
      color: theme.palette.text.primary,
      paddingLeft: '0.2rem',
      paddingRight: '0.2rem',
      margin: theme.spacing(1) + 'px !important',
    },
    contentButton: {
      marginLeft: theme.spacing(1),
    },
    proposalLink: {
      lineHeight: 1,
    },
  }
})

const getLink = id => {
  const baseLink =
    'https://www.eduskunta.fi/FI/vaski/KasittelytiedotValtiopaivaasia/Sivut/'
  var typeAndNumber = id.split(' ')
  var sessionAndYear = typeAndNumber[1].split('/')
  return `${baseLink}${typeAndNumber[0]}_${sessionAndYear[0]}+${
    sessionAndYear[1]
  }.aspx`
}

const filterDataWithUrl = (data, queryParams) => {
  const dateParam = queryParams.get('date')
  const yearParam = queryParams.get('year')
  const monthParam = queryParams.get('month')
  const searchParam = queryParams.get('search')

  if (searchParam) {
    return filterWithSearch(data, searchParam)
  } else if (dateParam) {
    return data.filter(
      item => DateTime.fromISO(item.date).toISODate() === dateParam
    )
  } else if (yearParam && monthParam) {
    return data.filter(
      item =>
        DateTime.fromISO(item.date).year === Number(yearParam) &&
        DateTime.fromISO(item.date).month === Number(monthParam)
    )
  }
  return data
}

const filterWithSearch = (data, searchFilter) => {
  if (!searchFilter || searchFilter === '') return data
  return data.filter(item => {
    let found = false
    item.keyword_list.forEach(obj => {
      if (obj.includes(searchFilter)) {
        found = true
      }
    })
    if (
      item.id.includes(searchFilter) ||
      item.title.includes(searchFilter) ||
      item.summary.includes(searchFilter)
    ) {
      found = true
    }

    return found
  })
}

const getSearchMatches = (keywords, id, queryParams) => {
  const searchParam = queryParams.get('search')
  if (!searchParam || searchParam === '') return []
  const matches = keywords.filter(keyword => keyword.includes(searchParam))
  if (id.includes(searchParam)) {
    matches.push(id)
  }
  return matches
}

const PerVoteTimeline = props => {
  const location = useLocation()
  const classes = useStyles()
  const queryParams = new URLSearchParams(location.search)
  const data = useMemo(() => filterDataWithUrl(initialData, queryParams), [
    queryParams,
  ])
  const [page, setPage] = useState(0)
  const [perPage] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [votesData, setVotesData] = useState({ decision: '', votes: [] })

  return (
    <React.Fragment>
      <VerticalTimeline
        animate={true}
        layout="1-column"
        className={classes.timeline}
      >
        {data.length === 0 ? (
          <VerticalTimelineElement
            className={classes.timelineelement}
            contentStyle={timelineStyles.default.content}
            contentArrowStyle={timelineStyles.default.arrow}
            iconStyle={timelineStyles.alternative.icon}
            position="right"
          >
            <h3 className={classes.time}>No matches found.</h3>
          </VerticalTimelineElement>
        ) : (
          paginate(data, page, perPage).map(item => (
            <VerticalTimelineElement
              key={item.id + '_' + item.vote_id}
              className={classes.timelineelement}
              contentStyle={timelineStyles.default.content}
              contentArrowStyle={timelineStyles.default.arrow}
              iconStyle={timelineStyles.alternative.icon}
              iconOnClick={() => {
                setVotesData({
                  decision: item.decision,
                  votes: fixJson(item.votes),
                })
                setDialogOpen(true)
              }}
              position="right"
            >
              <h3 className={classes.time}>
                {DateTime.fromISO(item.date).toFormat('DDD')}
              </h3>

              <Typography
                variant="h6"
                component="h5"
                className={classes.title}
                gutterBottom
              >
                {item.id + ' - ' + item.title}
              </Typography>

              {getSearchMatches(item.keyword_list, item.id, queryParams)
                .length !== 0 && (
                <Typography
                  variant="subtitle2"
                  component="h6"
                  className={classes.content}
                  display="inline"
                  gutterBottom
                >
                  Search matches:
                </Typography>
              )}

              {getSearchMatches(item.keyword_list, item.id, queryParams).map(
                (keyword, i, array) => (
                  <Tag
                    key={
                      DateTime.fromSQL(item.created).toISO() +
                      '_tag_' +
                      shortid.generate()
                    }
                    text={keyword}
                    size={1}
                  />
                )
              )}

              <Typography
                variant="body1"
                component="h6"
                className={classes.content}
                gutterBottom
              >
                {item.summary}
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                className={classes.contentButton}
                onClick={() => {
                  setVotesData({
                    decision: item.decision,
                    votes: fixJson(item.votes),
                  })
                  setDialogOpen(true)
                }}
              >
                votes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                as="a"
                target="_blank"
                href={getLink(item.id)}
                className={classes.contentButton}
              >
                <Icon
                  className={classes.proposalLink}
                  name="external alternate"
                />
                View proposal
              </Button>

              <br />
            </VerticalTimelineElement>
          ))
        )}
        <PaginationControllers
          page={page}
          setPage={setPage}
          perPage={perPage}
          dataSize={data.length}
        />
      </VerticalTimeline>
      <VotesDialog
        data={votesData}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </React.Fragment>
  )
}

PerVoteTimeline.propTypes = {}

export default PerVoteTimeline

/*<Typography
              variant="body1"
              component="h6"
              className={classes.content}
              gutterBottom
            >
              {JSON.stringify(getTotalDistribution(item.distribution))}
            </Typography> */
