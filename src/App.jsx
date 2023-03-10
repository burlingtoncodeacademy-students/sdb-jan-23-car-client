import { useEffect, useState } from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import AllCars from './components/AllCars/AllCars'

function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  })

  const updateLocalStorage = newToken => {
    // gets token from response and sets it in the browser
    localStorage.setItem("token", newToken)
    // sets local sessionToken state variable
    setSessionToken(newToken)
  }

  const handleView = () => {
    return !sessionToken
      ? <Auth updateLocalStorage={updateLocalStorage} />
      : <AllCars sessionToken={sessionToken} />
  }

  const logout = () => {
    localStorage.clear()
    setSessionToken(undefined)
  }

  return (
    <>
      <button onClick={logout}>Logout</button>
      {handleView()}
    </>
  )
}

export default App
