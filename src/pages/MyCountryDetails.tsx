import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Country } from '../types';
import './MyCountryDetails.css';

const MyCountryDetails: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();
    const [myCountry, setMyCountry] = useState<Country | null>(null);
    const [myBorderCountries, setMyBorderCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [myError, setMyError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyCountryData = async () => {
            try {
                setIsLoading(true);

                // First try to fetch from the local data.json file
                let response = await fetch('/data.json');

                if (!response.ok) {
                    // If local data.json fails, try the REST Countries API
                    console.log('Local data.json failed, trying REST Countries API...');
                    response = await fetch('https://restcountries.com/v2/all');
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch countries data from both sources');
                }

                const countries: Country[] = await response.json();

                const foundCountry = countries.find(c => c.alpha3Code === code);
                if (!foundCountry) {
                    setMyError('Country not found');
                    return;
                }

                setMyCountry(foundCountry);

                const borders = countries.filter(c =>
                    foundCountry.borders?.includes(c.alpha3Code)
                );
                setMyBorderCountries(borders);

            } catch (err) {
                console.error('Error fetching country data:', err);
                setMyError('Failed to load country data. Please check your internet connection.');
            } finally {
                setIsLoading(false);
            }
        };

        if (code) {
            fetchMyCountryData();
        }
    }, [code]);

    const formatPopulation = (population: number): string => {
        return population.toLocaleString();
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>The country details are loading !!!!</p>
            </div>
        );
    }

    if (myError || !myCountry) {
        return (
            <div className="error-container">
                <p>{myError || 'Country not found'}</p>
                <button onClick={() => navigate('/')} className="back-button">
                    ← Navigate to the home page
                </button>
            </div>
        );
    }

    return (
        <div className="country-detail">
            <div className="container">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Back
                </button>

                <div className="country-content">
                    <div className="country-flag-large">
                        <img
                            src={myCountry.flags.svg}
                            alt={`Flag of ${myCountry.name}`}
                        />
                    </div>

                    <div className="country-info-detailed">
                        <h1 className="country-title">{myCountry.name}</h1>

                        <div className="country-details-grid">
                            <div className="details-column">
                                <p><span className="label">Native Name:</span> {myCountry.nativeName}</p>
                                <p><span className="label">Population:</span> {formatPopulation(myCountry.population)}</p>
                                <p><span className="label">Region:</span> {myCountry.region}</p>
                                <p><span className="label">Sub Region:</span> {myCountry.subregion}</p>
                                <p><span className="label">Capital:</span> {myCountry.capital}</p>
                            </div>

                            <div className="details-column">
                                <p><span className="label">Top Level Domain:</span> {myCountry.topLevelDomain?.join(', ')}</p>
                                <p><span className="label">Currencies:</span> {myCountry.currencies?.map(c => c.name).join(', ')}</p>
                                <p><span className="label">Languages:</span> {myCountry.languages?.map(l => l.name).join(', ')}</p>
                            </div>
                        </div>

                        {myBorderCountries.length > 0 && (
                            <div className="border-countries">
                                <span className="label">Border Countries:</span>
                                <div className="border-buttons">
                                    {myBorderCountries.map((borderCountry) => (
                                        <Link
                                            key={borderCountry.alpha3Code}
                                            to={`/country/${borderCountry.alpha3Code}`}
                                            className="border-button"
                                        >
                                            {borderCountry.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCountryDetails;
