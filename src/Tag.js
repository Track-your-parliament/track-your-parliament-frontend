import React from 'react'
import PropTypes from 'prop-types'
import { Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  chip: props => ({
    margin: theme.spacing(1),
    fontSize: props.size * 2 + 0.8 + 'rem',
    height: props.size * 4 + 1 + 'rem',
    borderRadius: props.size * 4 + 2 + 'rem',
  }),
}))

const Tag = ({ text, size }) => {
  const classes = useStyles({ size })

  return <Chip label={text} className={classes.chip} />
}

Tag.propTypes = {}

export default Tag
