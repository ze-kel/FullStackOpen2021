import React, { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import Style from './GenericStyles'

const LoginForm = (props) => {
    if (props.user) {
        return null
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            props.setUser(user)
            setUsername('')
            setPassword('')
            props.setNotification('You are logged in!')
        } catch (e) {
            console.log(e)
            if (e.message.includes('401')) {
                props.setNotification('Failed to authorize. Wrong login and/or password')
            }
        }
    }
    return (
        <div>
            <h2 className="text-4xl">Login to app</h2>
            <form className="my-4" onSubmit={handleSubmit}>
                <div>
                    <p className="my-1">Username</p>
                    <input
                        className={Style.Form}
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <p className="my-1">Password</p>
                    <input
                        className={Style.Form}
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className={Style.Button + ' my-4'} type="submit" id="loginbutton">
                    login
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    setUser,
    setNotification,
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm
