const Notification = ({ message }) => {
  if (message.text === '') {
    return
  }

  const texStyle = {
    color: message.color,
    outline: message.color,
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
