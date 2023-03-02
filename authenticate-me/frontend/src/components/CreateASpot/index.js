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
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ lat, setLat ] = useState('')
    const [ lng, setLng ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    const [ previewImage, setPreviewImage ] = useState('')
    const [ imageTwo, setImageTwo ] = useState('')
    const [ imageThree, setImageThree ] = useState('')
    const [ imageFour, setImageFour ] = useState('')
    const [ imageFive, setImageFive ] = useState('')

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
    
                setIsSubmitted(false)
                reset()
                setErrors(errors)
                history.replace(`/spots/${editedSpot.id}`)
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
                history.replace(`/spots/${newSpot.id}`)
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
                                <label>Country: {isSubmitted && errors.countryError && ( <p className='errors'>{errors.countryError}</p> )} <input type='text' defaultValue={!edit ? country : spot.country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' /></label>
                            </li>
                            <li>
                                <label>Address: {isSubmitted && errors.addressError && ( <p className='errors'>{errors.addressError}</p> )}<input type='text' defaultValue={!edit ? address : spot.address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' /></label>
                            </li>
                            <li>
                                <label>City: {isSubmitted && errors.cityError && ( <p className='errors'>{errors.cityError}</p> )} <input type='text' defaultValue={!edit ? city : spot.city} onChange={(e) => setCity(e.target.value)} placeholder='City'  /> </label>
                            </li>
                            <li>
                                <label>State: {isSubmitted && errors.stateError && ( <p className='errors'>{errors.stateError}</p> )} <input type='text' defaultValue={!edit? state : spot.state} onChange={(e) => setState(e.target.value)} placeholder='STATE' /></label>
                            </li>
                            <li>
                                <label>Latitude: {isSubmitted && errors.latError && ( <p className='errors'>{errors.latError}</p> )} <input type='text' defaultValue={!edit ? lat : spot.lat} onChange={(e) => setLat(e.target.value)} placeholder='Latitude'  /></label>
                            </li>
                            <li>
                                <label>Longitude: {isSubmitted && errors.lngError && ( <p className='errors'>{errors.lngError}</p> )} <input type='text' defaultValue={!edit ? lng : spot.lng} onChange={(e) => setLng(e.target.value)} placeholder='Longitude'  /></label>
                            </li>
                        </div>
                    </div>
                    <div className='description-container-create-spot'>
                        <h2>Describe your place to guests</h2>
                        {isSubmitted && errors.descriptionError && ( <p className='errors'>{errors.descriptionError}</p> )}
                        <p><em>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</em></p>
                        <li>
                            <textarea defaultValue={!edit ? description : spot.description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters'  />
                        </li>
                    </div>
                    <div className='name-container'>
                        <li>
                            <h2>Create a title for your spot</h2>
                            <p><em>Catch guests' attention with a spot title that highlights what makes your place special.</em></p>
                            {isSubmitted && errors.nameError && ( <p className='errors'>{errors.nameError}</p> )}
                            <input type='text' defaultValue={!edit ? name : spot.name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot'  />
                        </li>
                    </div>
                    <div className='price-container'>
                        <li>
                            <h2>Set a base price for your spot</h2>
                            <p><em>Competitive pricing can help your listing stand out and rank higher in search results</em></p>
                            {isSubmitted && errors.priceError && ( <p className='errors'>{errors.priceError}</p> )}
                            <label>$ <input type='text' defaultValue={!edit ? price : spot.price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)'  /></label>
                        </li>
                    </div>
                    <div className='photos-container'>
                        <h2>Liven up your spot with photos</h2>
                        <p><em>Submit a link to at least one photo to publish your spot,</em></p>
                        <div className='location-inputs'>
                            {isSubmitted && errors.previewImgError && ( <p className='errors'>{errors.previewImgError}</p> )}
                            <input type='text' defaultValue={!edit ? previewImage : previewImg} onChange={(e) => setPreviewImage(e.target.value)} placeholder='Preview Image URL'  />
                            <input type='text' defaultValue={!edit ? imageTwo : regularImages[0] ? regularImages[0] : imageTwo} onChange={(e) => setImageTwo(e.target.value)} placeholder='Image URL'/>
                            <input type='text' defaultValue={!edit ? imageThree : regularImages[1] ? regularImages[1] : imageThree} onChange={(e) => setImageThree(e.target.value)} placeholder='Image URL'/>
                            <input type='text' defaultValue={!edit ? imageFour : regularImages[2] ? regularImages[2] : imageFour} onChange={(e) => setImageFour(e.target.value)} placeholder='Image URL'/>
                            <input type='text' defaultValue={!edit ? imageFive : regularImages[3] ? regularImages[3] : imageFive} onChange={(e) => setImageFive(e.target.value)} placeholder='Image URL'/>
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