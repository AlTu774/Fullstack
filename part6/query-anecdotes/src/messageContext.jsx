import { createContext, useReducer } from 'react'

const messageReducer = (state=null, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "REMOVE":
      return null
    default:
      return state
  }
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, null)

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageContext