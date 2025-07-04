import React from 'react';
import { Link } from 'react-router-dom';
import { Country } from '../types';
import './MyCountries.css';

interface MyCountryCardProps {
    country: Country;
}

const MyCountryCard: React.FC<MyCountryCardProps> = ({ country }) => {
    const formatPopulation = (population: number): string => {
        return population.toLocaleString();
    };

    return (
        <Link to={`/country/${country.alpha3Code}`} className="mycountryCard">
            <div className="country-flag">
                <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name}`}
                    loading="lazy"
                />
            </div>
            <div className="country-info">
                <h3 className="country-name">{country.name}</h3>
                <div className="country-details">
                    <p><span className="label">Population:</span> {formatPopulation(country.population)}</p>
                    <p><span className="label">Region:</span> {country.region}</p>
                    <p><span className="label">Capital:</span> {country.capital}</p>
                </div>
            </div>
        </Link>
    );
};

export default MyCountryCard;
