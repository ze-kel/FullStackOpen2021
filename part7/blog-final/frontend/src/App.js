import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogsReducer'
import Menu from './components/Menu'

const App = () => {
    //const [user, setUser] = useState(null)

    //console.log('APPPPP GET USER', store.getState().user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
        dispatch(initUser())
    }, [dispatch])
    return (
        <div>
            <h2>blogs</h2>
            <Menu />
            <Notification />
            <BlogForm />
            <LoginForm />
            <BlogList />
        </div>
    )
}

export default App
