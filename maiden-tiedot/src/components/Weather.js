import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capitalLat, capitalLon }) => {
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const api_key = process.env.REACT_APP_SOME_KEY
        console.log(api_key)

        if (api_key && capitalLat && capitalLon) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLon}&appid=${api_key}`
        

            axios.get(url)
                .then(response => {
                    setWeather(response.data)
                })
                .catch(error => {
                    setError(true)
                    console.error('Error fetching weather data', error)
                })
            }
        }, [capitalLat, capitalLon])


    if (error) {
        return <div>error loading weather data</div>
    }

    if (!weather) {
        return <div>Loading weather data...</div>
    }

    return (
        <div>
            {weather.main && weather.weather && (
            <>
                <h2>Weather in {weather.name}</h2>
                <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)} Celsius</p>
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}></img>
                <p>{weather.weather[0].description}</p>
                <p>Wind {weather.wind.speed} m/s</p>
            </>
            )}
        </div>
    )
}

export default Weather