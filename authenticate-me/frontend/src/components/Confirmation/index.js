// Necessary imports
import './Confirmation.css'

function Confirmation({ label, message, onYes, onNo, yesLabel, noLabel }){

    return (
        <>
            <div className='h-fit w-96 p-4 flex flex-col'>
                <div className='label'>
                    <h1 className='text-center text-3xl'>{label}</h1>
                </div>
                <div className='my-2.5 mx-auto'>
                    <p className='text-center'>{message}</p>
                </div>
                <div className='my-2.5 mx-auto flex flex-col'>
                    <button onClick={onYes} style={{ border: '2px solid black' }} className='my-0.5 mx-auto h-12 w-72 text-white bg-main-color shadow-3xl shadow-black hover:shadow-white'><p>Yes {yesLabel ? `(${yesLabel})`: ''}</p></button>
                    <button onClick={onNo} style={{ border: '2px solid black' }} className='my-0.5 mx-auto h-12 w-72 text-white bg-light-color shadow-3xl shadow-black hover:shadow-white'><p>No {noLabel ? `(${noLabel})`: ''}</p></button>
                </div>
            </div>
        </>
    )
}

export default Confirmation