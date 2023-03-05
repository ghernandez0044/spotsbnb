// Necessary imports
import React, { useState } from 'react'
import './ToolTip.css'

function ToolTip(props){
    // Declare state variables
    const [ active, setActive ] = useState(false)

    // Declare variables
    let timeout

    // function to show tool tip
    const show = () => {
        timeout = setTimeout(() => {
            setActive(true)
        }, props.delay || 500)
    }

    // function to hide tool tip
    const hide = () => {
        clearInterval(timeout)
        setActive(false)
    }

    return (
        <div className='ToolTip-Wrapper' onMouseEnter={show} onMouseLeave={hide}>
            {props.children}
            {active && ( 
                <div className='ToolTip-Tip'>
                    {props.content}
                </div>
             )}
        </div>
    )
}

export default ToolTip