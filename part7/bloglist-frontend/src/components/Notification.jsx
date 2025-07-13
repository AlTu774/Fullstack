import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state  => state.notification)
  if (message.text === '') {
    return
  }

  const texStyle = {
    color: message.color,
    outlineColor: message.color,
    outlineStyle: 'solid',
    background: 'lightgray',
  }
  return (
    <div style={texStyle}>
      <h2>{message.text}</h2>
    </div>
  )
}

export default Notification
