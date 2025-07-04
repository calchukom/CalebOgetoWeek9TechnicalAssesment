import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/Themes';
import Header from './components/Navbar';
import Home from './pages/Home';
import MyCountryDetails from './pages/MyCountryDetails';
import './App.css';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/country/:code" element={<MyCountryDetails />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
