// Necessary imports
import './Confirmation.css'

function Confirmation({ label, message, onYes, onNo }){
    return (
        <>
            <div className='overall-container'>
                <div className='label'>
                    <h3 style={{ textAlign: 'center' }}>{label}</h3>
                </div>
                <div className='message-container'>
                    <p>{message}</p>
                </div>
                <div className='confirmation-buttons-container'>
                    <button onClick={onYes} className='confirmation-button'>Yes</button>
                    <button onClick={onNo} className='confirmation-button'>No</button>
                </div>
            </div>
        </>
    )
}

export default Confirmation