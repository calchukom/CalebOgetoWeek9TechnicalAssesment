import React, { useState, useEffect, useMemo } from 'react';
import MyCountryCard from '../components/MyCountries';
import MySearchAndFilter from '../components/SearchBar';
import { Country } from '../types';
import './Home.css';

const Home: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('All');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                // First try to fetch from the local data.json file
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch countries data');
                }
                const data = await response.json();
                setCountries(data);
            } catch (err) {
                console.error('Error fetching countries:', err);
                setError('Failed to load countries data');
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const filteredCountries = useMemo(() => {
        return countries.filter(country => {
            const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
            return matchesSearch && matchesRegion;
        });
    }, [countries, searchTerm, selectedRegion]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>The countries are loading...please wait....</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home">
            <div className="container">
                <MySearchAndFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                />

                {filteredCountries.length === 0 ? (
                    <div className="no-results">
                        <p>No countries found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="countries-grid">
                        {filteredCountries.map((country) => (
                            <MyCountryCard key={country.alpha3Code} country={country} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
