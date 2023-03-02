// Necessary imports
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { createASpot } from '../../store/spots'
import { createAnImage } from '../../store/spotimages'
import { editASpot } from '../../store/spots'
import { useDispatch, useSelector } from 'react-redux'
import './CreateASpot.css'

function CreateASpot({ edit, spot }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Create state variables
    const [ name, setName ] = useState(spot?.name || '')
    const [ description, setDescription ] = useState(spot?.description || '')
    const [ city, setCity ] = useState(spot?.city || '')
    const [ state, setState ] = useState(spot?.state || '')
    const [ country, setCountry ] = useState(spot?.country || '')
    const [ address, setAddress ] = useState(spot?.address || '')
    const [ lat, setLat ] = useState(spot?.lat || '')
    const [ lng, setLng ] = useState(spot?.lng || '')
    const [ price, setPrice ] = useState(spot?.price || '')
    const [ errors, setErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    console.log('SpotImages: ', spot.SpotImages)

    const [ previewImage, setPreviewImage ] = useState(spot?.SpotImages[0].url || '')
    const [ imageTwo, setImageTwo ] = useState(spot?.SpotImages[1].url || '')
    const [ imageThree, setImageThree ] = useState(spot?.SpotImages[2].url || '')
    const [ imageFour, setImageFour ] = useState(spot?.SpotImages[3].url || '')
    const [ imageFive, setImageFive ] = useState(spot?.SpotImages[4].url || '')

    console.log('spot: ', spot)
    // Function to reset all fields on form
    const reset = () => {
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
    }

    useEffect(() => {
        const errors = {}

        if(country.length <= 0){
            errors.countryError = 'Country is required'
        }

        if(address.length <= 0){
            errors.addressError = 'Address is required'
        }

        if(city.length <= 0){
            errors.cityError = 'City is required'
        }

        if(state.length <= 0){
            errors.stateError = 'State is required'
            
        }

        if(lat.length <= 0){
            errors.latError = 'Latitude is required'
        }

        if(lng.length <= 0){
            errors.lngError = 'Longitude is required'
        }

        if(description.length < 30){
            errors.descriptionError = 'Description needs a minimum of 30 characters'
        }

        if(name.length <= 0){
            errors.nameError = 'Name is required'
        }

        if(price.length <= 0){
            errors.priceError = 'Price is required'
        }

        if(previewImage.length <= 0){
            errors.previewImgError = 'Preview image is required'
        }

        setErrors(errors)
    }, [ name, description, city, state, country, address, lat, lng, price, previewImage ])

    // Handle submission event
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if(Object.keys(errors).length === 0){
            const newSpotObj = {
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
    
            if(edit && spot){
                const editedSpot = await dispatch(editASpot(newSpotObj, spot.id)).catch(async (res) => {
                    const data = await res.json()
                    if(data && data.errors) errors.push(data.errors)
                })
                
                const spotImages = spot.SpotImages
                for(let image of spotImages){
                    
                }
    
                setIsSubmitted(false)
                reset()
                setErrors(errors)
                history.push(`/spots/${editedSpot.id}`)
            } else {
                const newSpot = await dispatch(createASpot(newSpotObj)).catch(async (res) => {
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
    
                setIsSubmitted(false)
                reset()
                setErrors(errors)
                history.push(`/spots/${newSpot.id}`)
            }
        } else {
            console.log('errors: ', errors)
            console.log('isSubmitted: ', isSubmitted)
        }
    }

    const store = useSelector(state => state)

    // Gain access to the preview image as well as any other regular images
    let previewImg
    const regularImages = []

        if(spot){
            const images = spot.SpotImages
    
            for(let image of images){
                if(image.preview === true){
                    previewImg = image.url
                } else {
                    regularImages.push(image.url)
                }
            }
        }
    

    console.log('previewImg: ', previewImg)
    console.log('regularImages: ', regularImages)



    return (
        <>
            {!edit ? <h1 style={{ textAlign: 'center' }}>Create A Spot</h1> : <h1 style={{ textAlign: 'center' }}>Edit A Spot</h1>}
            <form onSubmit={handleSubmit} className='create-a-spot-form'>
                <ul>
                    <div className='location-container'>
                        <h2>Where is your place located?</h2>
                        <p><em>Guests will only get your exact address once they have booked a reservation.</em></p>
                        <div className='location-inputs'>
                            <li>
                                <label>Country: {isSubmitted && errors.countryError && ( <p className='errors'>{errors.countryError}</p> )} <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' /></label>
                            </li>
                            <li>
                                <label>Address: {isSubmitted && errors.addressError && ( <p className='errors'>{errors.addressError}</p> )}<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' /></label>
                            </li>
                            <li>
                                <label>City: {isSubmitted && errors.cityError && ( <p className='errors'>{errors.cityError}</p> )} <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City'  /> </label>
                            </li>
                            <li>
                                <label>State: {isSubmitted && errors.stateError && ( <p className='errors'>{errors.stateError}</p> )} <input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='STATE' /></label>
                            </li>
                            <li>
                                <label>Latitude: {isSubmitted && errors.latError && ( <p className='errors'>{errors.latError}</p> )} <input type='text' value={lat} onChange={(e) => setLat(e.target.value)} placeholder='Latitude'  /></label>
                            </li>
                            <li>
                                <label>Longitude: {isSubmitted && errors.lngError && ( <p className='errors'>{errors.lngError}</p> )} <input type='text' value={lng} onChange={(e) => setLng(e.target.value)} placeholder='Longitude'  /></label>
                            </li>
                        </div>
                    </div>
                    <div className='description-container-create-spot'>
                        <h2>Describe your place to guests</h2>
                        {isSubmitted && errors.descriptionError && ( <p className='errors'>{errors.descriptionError}</p> )}
                        <p><em>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</em></p>
                        <li>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters'  />
                        </li>
                    </div>
                    <div className='name-container'>
                        <li>
                            <h2>Create a title for your spot</h2>
                            <p><em>Catch guests' attention with a spot title that highlights what makes your place special.</em></p>
                            {isSubmitted && errors.nameError && ( <p className='errors'>{errors.nameError}</p> )}
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot'  />
                        </li>
                    </div>
                    <div className='price-container'>
                        <li>
                            <h2>Set a base price for your spot</h2>
                            <p><em>Competitive pricing can help your listing stand out and rank higher in search results</em></p>
                            {isSubmitted && errors.priceError && ( <p className='errors'>{errors.priceError}</p> )}
                            <label>$ <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)'  /></label>
                        </li>
                    </div>
                    <div className='photos-container'>
                        <h2>Liven up your spot with photos</h2>
                        <p><em>Submit a link to at least one photo to publish your spot,</em></p>
                        <div className='location-inputs'>
                            {isSubmitted && errors.previewImgError && ( <p className='errors'>{errors.previewImgError}</p> )}
                            <input type='text' value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder='Preview Image URL'  />
                            <input type='text' value={imageTwo} onChange={(e) => setImageTwo(e.target.value)} placeholder='Image URL'/>
                            <input type='text' value={imageThree} onChange={(e) => setImageThree(e.target.value)} placeholder='Image URL'/>
                            <input type='text' value={imageFour} onChange={(e) => setImageFour(e.target.value)} placeholder='Image URL'/>
                            <input type='text' value={imageFive} onChange={(e) => setImageFive(e.target.value)} placeholder='Image URL'/>
                        </div>
                    </div>
                    <div className='button-container'>
                        <li>
                            {!edit ? <button type='submit'>Create A Spot</button> : <button type='submit'>Edit Spot</button>}
                        </li>
                    </div>
                </ul>
            </form>
        </>
    )
}

export default CreateASpot