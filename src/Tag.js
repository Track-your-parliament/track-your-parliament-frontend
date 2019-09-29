import React from 'react'
import PropTypes from 'prop-types'

const Tag = ({ text, size }) => {
  const fontSize = size * 4 + 0.5 + 'rem'
  const padding = size * 2 + 0.5 + 'rem'
  const borderRadius = size * 4 + 2 + 'rem'

  return (
    <p
      className="tag"
      style={{
        fontSize,
        paddingLeft: padding,
        paddingRight: padding,
        borderRadius,
      }}
    >
      {text}
    </p>
  )
}

Tag.propTypes = {}

export default Tag
