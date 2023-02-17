// Necessary imports
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createASpot } from '../../store/spots'
import { createAnImage } from '../../store/spotimages'
import { useDispatch, useSelector } from 'react-redux'
import './CreateASpot.css'

function CreateASpot(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Create state variables
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ lat, setLat ] = useState('')
    const [ lng, setLng ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ errors, setErrors ] = useState([])

    const [ previewImage, setPreviewImage ] = useState('')
    const [ imageTwo, setImageTwo ] = useState('')
    const [ imageThree, setImageThree ] = useState('')
    const [ imageFour, setImageFour ] = useState('')
    const [ imageFive, setImageFive ] = useState('')

    // Handle submission event
    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([])

        const errors = []

        const spot = {
            name,
            description,
            city,
            state,
            country,
            address,
            lat,
            lng,
            price
        }

        const newSpot = await dispatch(createASpot(spot)).catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) errors.push(data.errors)
        })

        const previewImageObj = {
            url: previewImage,
            preview: true
        }
        const newPreviewImage = await dispatch(createAnImage(previewImageObj, newSpot.id)).catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) errors.push(data.errors)
        })

        let images = [imageTwo, imageThree, imageFour, imageFive]

        for(let image of images){
            if(image !== ''){
                const imageObj = {
                    url: image,
                    preview: false
                }
                const newImage = await dispatch(createAnImage(imageObj, newSpot.id))
                if(newImage && newImage.errors) errors.push(newImage.errors)
            }
        }

        setErrors(errors)
        setName('')
        setDescription('')
        setCity('')
        setState('')
        setCountry('')
        setAddress('')
        setLat('')
        setLng('')
        setPrice('')
        setPreviewImage('')
        setImageTwo('')
        setImageThree('')
        setImageFour('')
        setImageFive('')

        history.replace(`/spots/${newSpot.id}`)
    }

    const store = useSelector(state => state)
    console.log('currentState: ', store)

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Create A Spot</h1>
            <form onSubmit={handleSubmit} className='create-a-spot-form'>
                <ul>
                    {errors.map((err, i) => {
                        <li key={i}>{err}</li>
                    })}
                </ul>
                <ul>
                    <div className='location-container'>
                        <h2>Where is your place located?</h2>
                        <p><em>Guests will only get your exact address once they booked a reservation.</em></p>
                        <div className='location-inputs'>
                            <li>
                                <label>Country:  <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' required /></label>
                            </li>
                            <li>
                                <label>Address: <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required /></label>
                            </li>
                            <li>
                                <label>City: <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' required /> </label>
                            </li>
                            <li>
                                <label>State: <input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='STATE' required /></label>
                            </li>
                            <li>
                                <label>Latitude: <input type='text' value={lat} onChange={(e) => setLat(e.target.value)} placeholder='Latitude' required /></label>
                            </li>
                            <li>
                                <label>Longitude: <input type='text' value={lng} onChange={(e) => setLng(e.target.value)} placeholder='Longitude' required /></label>
                            </li>
                        </div>
                    </div>
                    <div className='description-container-create-spot'>
                        <h2>Describe your place to guests</h2>
                        <p><em>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</em></p>
                        <li>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters' required />
                        </li>
                    </div>
                    <div className='name-container'>
                        <li>
                            <h2>Create a title for your spot</h2>
                            <p><em>Catch guests' attention with a spot title that highlights what makes your place special.</em></p>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot' required />
                        </li>
                    </div>
                    <div className='price-container'>
                        <h2>Set a base price for your spot</h2>
                        <p><em>Competitive pricing can help your listing stand out and rank higher in search results</em></p>
                        <li>
                            <label>$ <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)' required /></label>
                        </li>
                    </div>
                    <div className='photos-container'>
                        <h2>Liven up your spot with photos</h2>
                        <p><em>Submit a link to at least one photo to publish your spot,</em></p>
                        <div className='location-inputs'>
                            <input type='text' value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder='Preview Image URL' required />
                            <input type='text' value={imageTwo} onChange={(e) => setImageTwo(e.target.value)} placeholder='Image URL'/>
                            <input type='text' value={imageThree} onChange={(e) => setImageThree(e.target.value)} placeholder='Image URL'/>
                            <input type='text' value={imageFour} onChange={(e) => setImageFour(e.target.value)} placeholder='Image URL'/>
                            <input type='text' value={imageFive} onChange={(e) => setImageFive(e.target.value)} placeholder='Image URL'/>
                        </div>
                    </div>
                    <div className='button-container'>
                        <li>
                            <button type='submit'>Create A Spot</button>
                        </li>
                    </div>
                </ul>
            </form>
        </>
    )
}

export default CreateASpot