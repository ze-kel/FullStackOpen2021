import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'
import Style from './GenericStyles'

const User = (props) => {
    if (props.userList.length < 1) {
        return null
    }
    const match = useRouteMatch('/users/:id')
    const user = props.userList.find((user) => user.id === match.params.id)
    return (
        <div>
            <h2 className="text-4xl mb-4">Blogs added by {user.name} </h2>
            <div className={Style.ClickableListContaier}>
                {user.entries.map((blog) => {
                    return (
                        <Link className={Style.ClickableListItem} key={blog.id} to={'/blogs/' + blog.id}>
                            <p>{blog.title}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userList: state.userList,
    }
}

const connectedUser = connect(mapStateToProps)(User)

export default connectedUser
