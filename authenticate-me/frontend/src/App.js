// Necessary Imports
import { Route, Switch } from 'react-router-dom'
import SignupFormPage from './components/SignupFormModal';
import Navigation from './components/Navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { restoreUser } from './store/session';


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
           <h1>Homepage</h1>
         </Route>
         <Route exact path='/signup'>
           <SignupFormPage />
         </Route>
     </Switch>
      )}
    </>
  );
}

export default App;
