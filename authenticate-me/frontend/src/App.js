// Necessary Imports
import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { restoreUser } from './store/session';
import SpotGallery from './components/SpotGallery';
import SpotDetails from './components/SpotDetails';
import CreateASpot from './components/CreateASpot';


function App() { 
  // Create dispatch method
  const dispatch = useDispatch()

  // Create state variable to check if user is loaded
  const [ isLoaded, setIsLoaded ] = useState(false)
  
  // Restoring the Session User
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
         <Switch>
         <Route exact path='/'>
           <h1 style={{ textAlign: 'center' }}>Welcome To SpotsBnb!</h1>
           <SpotGallery />
         </Route>
         <Route exact path='/spots/:id'>
            <SpotDetails />
         </Route>
         <Route exact path='/new/spots'>
            <CreateASpot />
         </Route>
     </Switch>
      )}
    </>
  );
}

export default App;
