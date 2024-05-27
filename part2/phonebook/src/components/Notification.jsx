import "./Notification.css"

export const Notification = ({message, color}) => {
    if (message === null) {
        return null
    }

    console.log(message, color)
    const name = "notification"+color
    console.log(name)

    return (
        <div>
            <p className={name}> {message} </p>
        </div>
    )
}

export default Notification