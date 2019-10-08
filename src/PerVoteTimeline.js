import React, { useMemo, useState, useEffect } from 'react'
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
import PaginationControllers, { paginate } from './PaginationControllers'
import { Typography, Button } from '@material-ui/core'
import { fixJson } from './voteUtils'
import VotesDialog from './VotesDialog'

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

const filterKeywordsWithSearch = (keywords, queryParams) => {
  const searchParam = queryParams.get('search')
  if (!searchParam || searchParam === '') return []
  return keywords.filter(keyword => keyword.includes(searchParam))
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
  const [votesData, setVotesData] = useState([])

  useEffect(() => {
    setPage(0)
  }, [queryParams])

  return (
    <React.Fragment>
      <VerticalTimeline
        animate={true}
        layout="1-column"
        className={classes.timeline}
      >
        {paginate(data, page, perPage).map(item => (
          <VerticalTimelineElement
            key={item.id + '_' + item.vote_id}
            className={classes.timelineelement}
            contentStyle={timelineStyles.default.content}
            contentArrowStyle={timelineStyles.default.arrow}
            iconStyle={timelineStyles.alternative.icon}
            iconOnClick={() => setDialogOpen(true)}
            position="right"
          >
            <h3 className={classes.time}>
              {DateTime.fromSQL(item.date).toFormat('DDD')} (
              {item.hearing_stage})
            </h3>

            <Typography
              variant="h6"
              component="h5"
              className={classes.title}
              gutterBottom
            >
              {item.id + ' - ' + item.title}
            </Typography>

            <Typography
              variant="subtitle2"
              component="h6"
              className={classes.content}
              display="inline"
              gutterBottom
            >
              Search matches:
            </Typography>

            {filterKeywordsWithSearch(item.keywords_list, queryParams).map(
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
                setVotesData(fixJson(item.distribution))
                setDialogOpen(true)
              }}
            >
              votes
            </Button>

            <br />
          </VerticalTimelineElement>
        ))}
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
