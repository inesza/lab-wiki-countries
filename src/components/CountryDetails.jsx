import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CountryDetails = ({ countries }) => {
  const params = useParams();
  const alpha3Code = params.alpha3Code;
  useEffect(() => {
    async function getCountries() {
      const { data } = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`
      );
    }
    getCountries();
  }, []);

  return countries
    .filter((country) => country.alpha3Code === alpha3Code)
    .map((country) => {
      return (
        <div className="col-7" key={country.alpha3Code}>
          <img
            src={`https://flagpedia.net/data/flags/w702/${country.alpha2Code.toLowerCase()}.webp`}
            alt=""
            style={{ height: 'auto', width: '50%', margin: '10px' }}
          />

          <h1>{country.name.common}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{country.capital.map((cap) => cap)}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {country.area} km<sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul style={{ listStyle: 'none' }}>
                    {countries
                      .filter((elem) =>
                        country.borders.includes(elem.alpha3Code)
                      )
                      .map((border) => {
                        return (
                          <li key={border.name.common}>
                            <Link
                              to={`/${border.alpha3Code}`}
                              className="list-group-item list-group-item-action"
                            >
                              {border.name.common}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
};

export default CountryDetails;
