import PropTypes from 'prop-types'

import { useState } from 'react'


const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id='toggle-hidden' onClick={toggleVisibility}>{props.buttonLabelOn}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id='toggle-shown' onClick={toggleVisibility}>{props.buttonLabelOff}</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabelOn: PropTypes.string.isRequired,
  buttonLabelOff: PropTypes.string.isRequired
}

export default Togglable