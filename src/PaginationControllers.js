import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
    },
    buttonIconLeft: {
      marginRight: theme.spacing(1),
    },
    buttonIconRight: {
      marginLeft: theme.spacing(1),
    },
  }
})

export const paginate = (data, page, perPage) => {
  return data.slice(page * perPage, (page + 1) * perPage)
}

const PaginationControllers = ({ page, setPage, perPage, dataSize }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {page !== 0 && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setPage(page - 1)
          }}
        >
          <ArrowBackIcon className={classes.buttonIconLeft} />
          Previous
        </Button>
      )}
      {dataSize > (page + 1) * perPage && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setPage(page + 1)
          }}
        >
          Next
          <ArrowForwardIcon className={classes.buttonIconRigth} />
        </Button>
      )}
    </div>
  )
}

PaginationControllers.propTypes = {}

export default PaginationControllers
