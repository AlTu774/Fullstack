const initialState = {
  text:'',
  color:''
}

const notificationsReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'RESET':
    return initialState
  default:
    return state
  }
}

export const setMessage = (message) => {
  return {
    type: 'SET',
    payload: message
  }
}

export const resetMessage = () => {
  return {
    type: 'RESET'
  }
}

export default notificationsReducer