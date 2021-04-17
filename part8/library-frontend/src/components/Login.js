import React, { useState } from 'react'

import { useMutation } from '@apollo/client';
import { LOGIN } from './queries'

const Login = (props) => {
    const setToken = props.setToken

    const [username, setUsername] = useState('Kirill')
    const [password, setPassword] = useState('secred')

    const [login] = useMutation(LOGIN)

    if (!props.show) {
        return null
    }

    const performLogin = async (event) => {
        try {
            event.preventDefault()
            console.log("login")
            const result = await login({ variables: { username, password } })
            setToken(result.data.login.value)
            localStorage.setItem('user-token', result.data.login.value)
        } catch (e) {
            console.log(e)
        }
    }

    if (props.token) {
        return <h2>You are logged in!</h2>
    }

    return (
        <div>
            <form onSubmit={performLogin}>
                <p>Username:</p> <input value={username} onChange={({ target }) => setUsername(target.value)}></input>
                <p>Password:</p> <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login