// Necessary imports
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { createASpot } from '../../store/spots'
import { createAnImage, deleteAnImage } from '../../store/spotimages'
import { editASpot } from '../../store/spots'
import { loadSpot } from '../../store/spots'
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
    const [ previewImage, setPreviewImage ] = useState(spot?.SpotImages[0].url || '')
    const [ imageTwo, setImageTwo ] = useState(spot?.SpotImages[1]?.url || '')
    const [ imageThree, setImageThree ] = useState(spot?.SpotImages[2]?.url || '')
    const [ imageFour, setImageFour ] = useState(spot?.SpotImages[3]?.url || '')
    const [ imageFive, setImageFive ] = useState(spot?.SpotImages[4]?.url || '')

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

    // Checking for validation errors on form inputs
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

        if(Number(lat) < -90 || Number(lat) > 90){
            errors.latRangeError = 'Must be between -90 and 90'
        }

        if(lng.length <= 0){
            errors.lngError = 'Longitude is required'
        }

        if(Number(lng) < -180 || Number(lng) > 180){
            errors.lngRangeError = 'Must be between -180 and 180'
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

        if(Number(price) <= 0 || Number(price) >= 5000){
            errors.priceRangeError = 'Price must be between $0 and $5,000 '
        }

        if(previewImage.length <= 0){
            errors.previewImgError = 'Preview image is required'
        }

        setErrors(errors)
    }, [ name, description, city, state, country, address, lat, lng, price, previewImage ])


    // Function to create images for a spot
    const createImages =  async (id) => {
        const previewImageObj = {
            url: previewImage,
            preview: true
        }
        const newPreviewImage = await dispatch(createAnImage(previewImageObj, id)).catch(async (res) => {
            const data = await res.json()
            if(data && data.errors){
                errors.push(data.errors)
            } 
        })

        let images = [imageTwo, imageThree, imageFour, imageFive]

        for(let image of images){
            if(image !== ''){
                const imageObj = {
                    url: image,
                    preview: false
                }
                const newImage = await dispatch(createAnImage(imageObj, id))
                if(newImage && newImage.errors) errors.push(newImage.errors)
            }
        }
    }


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
                    if(data && data.errors){
                        errors.push(data.errors)
                    } 
                })
                
                const spotImages = spot.SpotImages
                for(let image of spotImages){
                    dispatch(deleteAnImage(image.id))
                }

                await createImages(spot.id)
                setIsSubmitted(false)
                reset()
                setErrors(errors)
                history.push(`/spots/${editedSpot.id}`)
            } else {
                const newSpot = await dispatch(createASpot(newSpotObj)).catch(async (res) => {
                    const data = await res.json()
                    if(data && data.errors) errors.push(data.errors)
                })
        
                await createImages(newSpot.id)
                setIsSubmitted(false)
                reset()
                setErrors(errors)
                dispatch(loadSpot(newSpot.id))
                history.push(`/spots/${newSpot.id}`)
            }
        } else {
            return
        }
    }

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
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-center text-4xl bold mb-6 phone:text-2xl'>{!edit ? 'Create A Spot' : 'Edit A Spot'}</h1>
            <form onSubmit={handleSubmit} className='w-2/5 flex justify-center items-center'> 
                <ul>
                    <div className='w-full p-3.5 m-2.5 border-b border-b-lightgray phone:w-64 phone:mx-auto phone:h-fit'>
                        <h2 className='bold text-lg uppercase phone:text-center'>Where is your place located?</h2>
                        <p className='italic my-3.5 phone:text-center'>Guests will only get your exact address once they have booked a reservation.</p>
                        <div className='grid grid-cols-4 grid-rows-4 gap-1 phone:flex phone:flex-col phone:justify-center phone:items-start'>
                            <li id='country'>
                                <label>Country:<br></br>  {isSubmitted && errors.countryError && ( <p className='text-red-600'>{errors.countryError}</p> )} <input className='placeholder:italic w-96 phone:w-48' type='text' value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' /></label>
                            </li>
                            <li id='address'>
                                <label>Address: <br></br>  {isSubmitted && errors.addressError && ( <p className='text-red-600'>{errors.addressError}</p> )}<input className='placeholder:italic w-96 phone:w-48' type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' /></label>
                            </li>
                            <li id='city'>
                                <label>City: <br></br> {isSubmitted && errors.cityError && ( <p className='text-red-600'>{errors.cityError}</p> )} <input className='placeholder:italic w-60 phone:w-40' type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City'  /> </label>
                            </li>
                            <li id='state'>
                                <label>State: {isSubmitted && errors.stateError && ( <p className='text-red-600'>{errors.stateError}</p> )}<br/> <input className='placeholder:italic w-28 phone:w-14' type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='STATE'/></label>
                            </li>
                            <li id='lat'>
                                <label>Latitude: <br></br>  {isSubmitted && errors.latError && ( <p className='text-red-600'>{errors.latError}</p> )} {isSubmitted && errors.latRangeError && ( <p className='text-red-600'>{errors.latRangeError}</p> )} <input className='placeholder:italic w-60 phone:w-40' type='text' value={lat} onChange={(e) => setLat(e.target.value)} placeholder='Latitude'  /></label>
                            </li>
                            <li id='lng'>
                                <label>Longitude: <br></br>  {isSubmitted && errors.lngError && ( <p className='text-red-600'>{errors.lngError}</p> )} {isSubmitted && errors.lngRangeError && ( <p className='text-red-600'>{errors.lngRangeError}</p> )} <input className='placeholder:italic w-60 phone:w-40' type='text' value={lng} onChange={(e) => setLng(e.target.value)} placeholder='Longitude'  /></label>
                            </li>
                        </div>
                    </div>
                    <div className='w-full p-3.5 m-3 border-b border-b-lightgray phone:w-64 phone:mx-auto phone:h-fit'>
                        <h2 className='bold text-lg uppercase phone:text-center'>Describe your place to guests</h2>
                        {isSubmitted && errors.descriptionError && ( <p className='text-red-600'>{errors.descriptionError}</p> )}
                        <p className='italic my-3.5 phone:text-center'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <li>
                            <textarea className='placeholder:italic w-96 h-36 phone:w-48 phone:h-52 phone:ml-4 phone:text-center' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters'  />
                        </li>
                    </div>
                    <div className='w-full p-3.5 m-3 border-b border-b-lightgray phone:w-64 phone:mx-auto phone:h-fit'>
                        <li>
                            <h2 className='bold text-lg uppercase phone:text-center'>Create a title for your spot</h2>
                            <p className='italic my-3.5 phone:text-center'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                            {isSubmitted && errors.nameError && ( <p className='text-red-600'>{errors.nameError}</p> )}
                            <input className='placeholder:italic w-96 phone:w-48' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot'  />
                        </li>
                    </div>
                    <div className='w-full p-3.5 m-3 border-b border-b-lightgray phone:w-64 phone:mx-auto phone:h-fit'>
                        <li>
                            <h2 className='bold text-lg uppercase phone:text-center'>Set a base price for your spot</h2>
                            <p className='italic my-3.5 phone:text-center'>Competitive pricing can help your listing stand out and rank higher in search results</p>
                            {isSubmitted && errors.priceError && ( <p className='text-red-600'>{errors.priceError}</p> )}
                            {isSubmitted && errors.priceRangeError && ( <p className='text-red-600'>{errors.priceRangeError}</p> )}
                            <label>$ <input className='placeholder:italic  w-96 phone:w-48' type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)'  /></label>
                        </li>
                    </div>
                    <div className='w-full p-3.5 m-3 border-b border-b-lightgray phone:w-64 phone:mx-auto phone:h-fit'>
                        <h2 className='bold text-lg uppercase phone:text-center'>Liven up your spot with photos</h2>
                        <p className='italic my-3.5 phone:text-center'>Submit a link to at least one photo to publish your spot.</p>
                        <div className='flex flex-col items-start'>
                            {isSubmitted && errors.previewImgError && ( <p className='text-red-600'>{errors.previewImgError}</p> )}
                            <input className='placeholder:italic w-96 phone:w-48' type='text' value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder='Preview Image URL'  />
                            <input className='placeholder:italic w-96 phone:w-48' type='text' value={imageTwo} onChange={(e) => setImageTwo(e.target.value)} placeholder='Image URL' />
                            <input className='placeholder:italic w-96 phone:w-48' type='text' value={imageThree} onChange={(e) => setImageThree(e.target.value)} placeholder='Image URL' />
                            <input className='placeholder:italic w-96 phone:w-48' type='text' value={imageFour} onChange={(e) => setImageFour(e.target.value)} placeholder='Image URL' />
                            <input className='placeholder:italic w-96 phone:w-48' type='text' value={imageFive} onChange={(e) => setImageFive(e.target.value)} placeholder='Image URL' />
                        </div>
                    </div>
                    <div className='text-center p-3.5 m-3'>
                        <li>
                            <button style={{ border: '2px solid black' }} className='bg-main-color text-white cursor-pointer h-9 w-24 mt-1 mb-6 shadow-3xl shadow-black hover:shadow-white' type='submit'>{!edit ? 'Create A Spot' : 'Edit Spot'}</button>
                        </li>
                    </div>
                </ul>
            </form>
        </div>
    )
}

export default CreateASpot