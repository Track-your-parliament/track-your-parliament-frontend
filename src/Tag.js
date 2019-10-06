import React from 'react'
import { Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  chip: props => ({
    margin: theme.spacing(1),
    fontSize: props.size * 0.05 + 1 + 'rem',
    height: props.size * 0.1 + 1.2 + 'rem',
    borderRadius: props.size * 0.05 + 1 + 'rem',
    paddingLeft: props.size * 0.01 + 'rem',
    paddingRight: props.size * 0.01 + 'rem',
  }),
}))

const Tag = ({ text, size }) => {
  const classes = useStyles({ size })

  return <Chip label={text} className={classes.chip} />
}

Tag.propTypes = {}

export default Tag
