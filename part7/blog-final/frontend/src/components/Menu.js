import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

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
    return (
        <div className="menu">
            <Link to="/blogs">Blogs</Link>
            <Link to="/users">Users</Link>
            {LoggedUserInfo()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = { removeUser }

const connectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default connectedMenu
