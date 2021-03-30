import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/userReducer'

const Menu = (props) => {
    const LoggedUserInfo = () => {
        if (props.user) {
            return (
                <div>
                    <p>{props.user.name} is logged in</p>
                    <button onClick={props.removeUser}>LOG OUT</button>
                </div>
            )
        } else {
            return ''
        }
    }
    return LoggedUserInfo()
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = { removeUser }

const connectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default connectedMenu
