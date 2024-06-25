import "./Notification.css"

export const Notification = ({message, color}) => {
    if (message === null) {
        return null
    }

    const name = "notification"+color

    return (
        <div>
            <p className={name}> {message} </p>
        </div>
    )
}

export default Notification