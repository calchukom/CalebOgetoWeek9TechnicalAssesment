import React from 'react';
import './SearchBar.css';

interface MySearchAndFilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
}

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const MySearchAndFilter: React.FC<MySearchAndFilterProps> = ({
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
}) => {
    return (
        <div className="search-filter-container">
            <div className="search-box">
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="filter-dropdown">
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="choose-region"
                >
                    {regions.map((region) => (
                        <option key={region} value={region}>
                            {region === 'All' ? 'Filter by Region' : region}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MySearchAndFilter;
