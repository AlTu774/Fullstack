import { useContext } from "react"
import MessageContext from "../messageContext"

const Notification = () => {
  const [message, dispatch] = useContext(MessageContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (message==null) {
    return null
  } else {
    setTimeout(() => {
      dispatch({ type: "REMOVE" })
    },5000)
    
    return (
      <div style={style}>
        {message}    
      </div>
    )
  }
}

export default Notification
