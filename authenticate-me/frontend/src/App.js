// Necessary Imports
import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { restoreUser } from './store/session';
import SpotGallery from './components/SpotGallery';
import SpotDetails from './components/SpotDetails';
import CreateASpot from './components/CreateASpot';
import ManageSpots from './components/ManageSpots';
import ManageReviews from './components/ManageReviews'
import ManageBookings from './components/ManageBookings';
import SpotProvider from './components/SpotProvider'
import SpotSearchResults from './components/SpotSearchResults';


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
        <>
          <Switch>
            <Route exact path='/'>
              <SpotGallery />
            </Route>
            <Route exact path='/spots/new'>
                <CreateASpot />
            </Route>
            <Route exact path='/spots/current'>
                <ManageSpots />
            </Route>
            <Route exact path='/spots/results/:searchQuery'>
                <SpotSearchResults />
            </Route>
            <Route exact path='/spots/:id/edit'>
                <SpotProvider />
            </Route>
            <Route exact path='/spots/:id'>
                <SpotDetails />
            </Route>
            <Route exact path='/reviews/current'>
                <ManageReviews />
            </Route>
            <Route exact path='/bookings/current'>
                <ManageBookings />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
