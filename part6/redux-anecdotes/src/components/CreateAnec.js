import React from 'react'
import { addAnec } from '../reducers/anecdoteReducer'
import { useDispatch, connect } from 'react-redux'



const CreateAnec = (props) => {

    const add = async (event) => {
        event.preventDefault()
        const text = event.target.newanec.value
        event.target.newanec.value = ''
        props.addAnec(text)
    }

    return (
        <form onSubmit={add}>
            <h2>Create new</h2>
            <div><input name="newanec" /></div>
            <button type="submit">create</button>
        </form>
    )
}


const mapDispatchToProps = {
    addAnec
}

const connectedCreateAnec = connect(null, mapDispatchToProps)(CreateAnec)


export default connectedCreateAnec