import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    let opacity = props.notification.length > 0 ? ' opacity-100' : ' opacity-0'
    return <div className={'my-1 h-10 px-4 flex items-center text-lg rounded-sm bg-black text-white' + opacity}>{props.notification}</div>
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification
