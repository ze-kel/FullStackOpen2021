/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Style from './GenericStyles'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div className="my-7">
            <div style={hideWhenVisible}>
                <button className={Style.Button} onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} className="togglableHiddenContent">
                <h2 className="font-semibold text-xl border-l-2 border-black px-2 py-2">{props.buttonLabel} </h2>
                {props.children}
                <button className={Style.Button} onClick={toggleVisibility}>
                    Cancel
                </button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
