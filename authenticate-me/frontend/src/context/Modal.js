// Necessary imports
import React, { useRef, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

// Create Modal Context
const ModalContext = React.createContext()

export function ModalProvider({ children }){
    // Create reference to modal
    const modalRef = useRef()

    // Create state variables
    const [ modalContent, setModalContent ] = useState(null)
    const [ onModalClose, setOnModalClose ] = useState(null)

    // Create context value
    const contextValue = {
        modalRef, // reference to modal div
        modalContent, // React component to render inside modal
        setModalContent, // function to set the React component to render inside modal
        setOnModalClose // function to set the callback function to be called when modal is closing
     }

    // Function to close modal
    const closeModal = () => {
        setModalContent(null) // clear the modal contents

        // If callback function is truthy, call the callback function and reset it
        if(typeof onModalClose === 'function'){
            setOnModalClose(null)
            onModalClose()
        }
    }


    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef}></div>
        </>
    )
}

// Modal functional component
export function Modal(){
    const { modalRef, modalContent, closeModal } = useContext(ModalContext)

    // If  there is no div referenced by the modalRef or modalContent is not a truthy value, render nothing
    if(!modalRef || !modalRef.current || !modalContent) return null

    // Render the following component to the div referenced by the modalRef
    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={closeModal}></div>
            <div id='modal-content'>{modalContent}</div>
        </div>,
        modalRef.current
    )
}

// Custom hook to consume modal context
export const useModal = () => useContext(ModalContext)