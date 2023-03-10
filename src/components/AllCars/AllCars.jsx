import React, { useEffect, useState } from 'react'

function AllCars({ sessionToken }) {

    const [ displayCars, setDisplayCars ] = useState(false)
    const [ allCars, setAllCars ] = useState([])
  
    const fetchCars = () => {
        let url = "http://localhost:4000/car/getall"

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": sessionToken
            })
        })
        .then(res => res.json())
        .then(data => {setAllCars(data); setDisplayCars(true)})
    }

    useEffect(() => {
        fetchCars()
    }, [])
  
    return (
        <div>
            {!displayCars ? <h1>Loading...</h1> : allCars.map((car, key) => {
                return (
                    <>
                    <h1 key={key}>{car.make}</h1>
                    <h1 key={key}>{car.color}</h1>
                    <h1 key={key}>{car.mileage}</h1>
                    <h1 key={key}>{car.vin}</h1>
                    </>
                )
            })}
        </div>
  )
}

export default AllCars