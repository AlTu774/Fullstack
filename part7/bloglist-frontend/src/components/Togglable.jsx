import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(props.state)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} name={props.buttonLabel[0]} size='small'>{props.buttonLabel[0]}</Button>
      </div>
      <div style={showWhenVisible} className='toggleChildren'>
        {props.children}
        <Button onClick={toggleVisibility} name={props.buttonLabel[0]} size='small'>{props.buttonLabel[1]}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
