// src/components/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${searchTerm}`)
                .then(response => {
                    setCountries(response.data);
                });
        }
    }, [searchTerm]);

    return (
        <div>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <CountryList countries={countries} />
        </div>
    );
};

export default App;

