import "./Notification.css"

export const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div>
            <p className="notification"> {message} </p>
        </div>
    )
}

export default Notification