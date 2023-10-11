
import React from 'react';

const CountryList = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Please specify a more specific filter</div>;
    } else if (countries.length > 1) {
        return (
            <ul>
                {countries.map(country => (
                    <li key={country.name}>{country.name}</li>
                ))}
            </ul>
        );
    } else if (countries.length === 1) {
        const country = countries[0];
        return (
            <div>
                <h1>{country.name}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => (
                        <li key={language.name}>{language.name}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return null;
};

export default CountryList;
