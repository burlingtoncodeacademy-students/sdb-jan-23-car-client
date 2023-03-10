import React, { useState } from 'react'
import "./auth.css"

function Auth({ updateLocalStorage }) {

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ login, setLogin ] = useState(true)
    console.log(email, password, name)

    const register = () => login ? null : (
        <>
        <input
            type="text"
            name="name"
            id="name" 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
            />
        </>
    )

    const authToggle = () => {
        setLogin(!login)
        setName("")
        setEmail("")
        setPassword("")
    }

    const buttonToggle = () => login ? "Sign Up" : "Login"

    const handleSubmit = e => {
        e.preventDefault()

        let url = login
            ? "http://localhost:4000/user/login"
            : "http://localhost:4000/user/register"

        console.log(url)

        let body = login ? { email, password } : { name, email, password }
        console.log(body)

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => updateLocalStorage(data.token))
        .catch(err => console.log(err))
    }

  return (
    <>
        <form action="" className="form-wrapper">
            {register()}
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email"
                />
            <input
                type="password"
                name="password"
                id="pwd"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                />
            <button onClick={handleSubmit}>Click</button>
        </form>
        <button onClick={authToggle}>Switch to {buttonToggle()}</button>
    </>
  )
}

export default Auth