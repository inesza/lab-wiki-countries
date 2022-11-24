import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CountriesList from './components/CountriesList';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';

function App() {
  const [countries, setCountries] = useState(null);
  useEffect(() => {
    async function getCountries() {
      const { data } = await axios.get(
        ' https://ih-countries-api.herokuapp.com/countries'
      );

      const sortedData = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedData);
    }
    getCountries();
  }, []);
  if (!countries) {
    return (
      <div className="container" style={{ height: '100vh' }}>
        <div
          className="row align-items-center justify-content-center"
          style={{ height: '100%', fontSize: '4em' }}
        >
          Loading....
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <div
            className="col-5"
            style={{ maxHeight: ' 90vh', overflowY: 'scroll' }}
          >
            <div className="list-group">
              <CountriesList
                countries={countries}
                setCountries={setCountries}
              />
            </div>
          </div>
          <Routes>
            <Route
              path=":alpha3Code"
              element={<CountryDetails countries={countries} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
