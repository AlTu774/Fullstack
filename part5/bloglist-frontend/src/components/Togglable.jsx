import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(props.state)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {props.buttonLabel[0]}
        </button>
      </div>
      <div style={showWhenVisible} className='toggleChildren'>
        {props.children}
        <button onClick={toggleVisibility}>
          {props.buttonLabel[1]}
        </button>
      </div>
    </div>
  )
})

Togglable.displayName='Togglable'

export default Togglable