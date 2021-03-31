import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogsReducer'
import { initUserlist } from './reducers/userListReducer'
import Menu from './components/Menu'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initBlogs())
        dispatch(initUser())
        dispatch(initUserlist())
    }, [dispatch])
    return (
        <Router>
            <Menu />
            <div className="max-w-2xl m-auto">
                <Notification />
                <LoginForm />
                <Switch>
                    <Route path="/blogs/:id">
                        <Blog />
                    </Route>
                    <Route path="/blogs">
                        <BlogList />
                    </Route>
                    <Route path="/users/:id">
                        <User />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
