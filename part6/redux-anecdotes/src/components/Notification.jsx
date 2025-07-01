import { useSelector } from 'react-redux'

const Notification = () => {
  let notification = useSelector(state => {
    state.notification
    return state.notification
  })

  const Message = (message) => {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return(
      <div style={style}>
        {message}
      </div>

    )
  }
  
  return (
    <div>
    {notification && Message(notification)}
    </div>
  )
}

export default Notification