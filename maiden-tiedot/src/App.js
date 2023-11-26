// src/components/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
                .then(response => {
                    setCountries(response.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        setCountries([])
                    } else {
                        console.error('Error fetching data', error)
                    }
                })
            }, []);

    useEffect(() => {
        if (searchTerm) {
            const searchResults = countries.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
                )
                setFilteredCountries(searchResults)
        } else {
            setFilteredCountries([])
        }
    }, [searchTerm, countries]);

    const handleShowCountry = (countryName) => {
        const countryToShow = countries.filter(country =>
            country.name.common === countryName
        )
        setFilteredCountries(countryToShow)
    }

    return (
        <div>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}></SearchBar>
            <CountryList countries={filteredCountries} onShowCountry={handleShowCountry}/>
        </div>
    );
};

export default App;




