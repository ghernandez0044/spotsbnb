// Necessary Imports
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { restoreUser } from './store/session';


function App() { 
  // Create dispatch method
  const dispatch = useDispatch()
  
  // Restoring the Session User
  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <Switch>
        <Route exact path='/'>
          <h1>Homepage</h1>
        </Route>
        <Route exact path='/login'>
          <LoginFormPage />
        </Route>
    </Switch>
  );
}

export default App;
