// Necessary imports
import React from 'react'
import { useModal } from '../../context/Modal'

function OpenModalMenuItem({ modalComponent, itemText, onItemClick, onModalClose }){
    // Consume ModalContext
    const { setModalContent, setOnModalClose } = useModal()

    // Create on click function
    const onClick = () => {
        if(onModalClose) setOnModalClose(onModalClose)
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }


    return (
        <li onClick={onClick}><p>{itemText}</p></li>
    )
}

export default OpenModalMenuItem