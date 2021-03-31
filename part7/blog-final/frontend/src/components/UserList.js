import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => {
    return (
        <div>
            <h2>USERS</h2>
            {props.userList.map((user) => (
                <div key={user.id}>
                    <Link to={'/users/' + user.id}>
                        <p>
                            {user.name} {user.entries.length}
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userList: state.userList,
    }
}

const connectedUserList = connect(mapStateToProps)(UserList)

export default connectedUserList
