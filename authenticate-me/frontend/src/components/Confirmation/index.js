// Necessary imports
import './Confirmation.css'

function Confirmation({ label, message, onYes, onNo, yesLabel, noLabel }){
    return (
        <>
            <div className='overall-container'>
                <div className='label'>
                    <h1 style={{ textAlign: 'center' }}>{label}</h1>
                </div>
                <div className='message-container'>
                    <p>{message}</p>
                </div>
                <div className='confirmation-buttons-container'>
                    <button onClick={onYes} className='confirmation-button yes'><p>Yes {yesLabel ? `(${yesLabel})`: ''}</p></button>
                    <button onClick={onNo} className='confirmation-button no'><p>No {noLabel ? `(${noLabel})`: ''}</p></button>
                </div>
            </div>
        </>
    )
}

export default Confirmation