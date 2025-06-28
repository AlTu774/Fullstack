import { useSelector, useDispatch } from 'react-redux'
import { removeMessage } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch()
  let notification = useSelector(state => {
    state.notification
    return state.notification
  })

  if (notification !== null) {
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000);
  }

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