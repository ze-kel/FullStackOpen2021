import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Menu = (props) => {
    const menuItemStyle = () => {
        return 'py-2 hover:bg-black hover:text-white px-8 transition-all duration-150'
    }

    return (
        <div className="flex place-items-center text-center border-b border-black divide-black divide-x justify-center">
            <div className="py-2 px-8 font-bold">Blogs App</div>
            <Link className={menuItemStyle()} to="/blogs">
                Blogs
            </Link>
            <Link className={menuItemStyle()} to="/users">
                Users
            </Link>
            {props.user ? (
                <button className={menuItemStyle()} onClick={props.removeUser}>
                    Log Out
                </button>
            ) : (
                ''
            )}
            {props.user ? <div className="px-8 py-2 font-light">{props.user.name} is logged in.</div> : ''}
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
