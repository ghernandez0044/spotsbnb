// Necessary imports
import React from 'react'
import { useModal } from "../../context/Modal"
import './OpenModalButton.css'

function OpenModalButton({ modalComponent, buttonText, onButtonClick, onModalClose }){
    // Consuming ModelContext
    const { setModalContent, setOnModalClose } = useModal()

    // Create onClick function
    const onClick = () => {
        if(typeof onButtonClick === 'function') onButtonClick()
        if(typeof onModalClose === 'function') setOnModalClose(onModalClose)
        setModalContent(modalComponent)
    }


    return (
        <button className='modal-button' style={{ fontFamily: 'Rubik' }} onClick={onClick}>{buttonText}</button>
    )
}

export default OpenModalButton