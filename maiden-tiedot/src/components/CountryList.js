
import React from 'react';
import Weather from './Weather';

const CountryList = ({ countries, onShowCountry }) => {
    if (countries.length > 10) {
        return <div>Too many matches, Please specify a more specific filter</div>;
    } else if (countries.length > 1) {
        return (
            <ul>
                {countries.map(country => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => onShowCountry(country.name.common)}>show</button>
                        </li>
                ))}
            </ul>
        );
    } else if (countries.length === 1) {
        const country = countries[0];
        return (
            <div>
                <h1>Country name: {country.name.common}</h1>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
                <p>Population: {country.population}</p>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
                <Weather capitalLat={country.capitalInfo.latlng[0]} capitalLon={country.capitalInfo.latlng[1]}></Weather>
                
            </div>
        );
    } else if (countries.length === 0) {
        return <div>No matches, try a different filter</div>
    }

    return null;
};

export default CountryList;
