import React from 'react';
import { Link } from 'react-router-dom';

const CountriesList = ({ countries }) => {
  return (
    <div>
      <h2>Countries</h2>
      {countries.map((country) => {
        return (
          <Link
            key={country.alpha3Code}
            to={country.alpha3Code}
            className="list-group-item list-group-item-action d-flex flex-column align-items-center"
          >
            <img
              src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
              alt=""
              style={{ height: '27px', width: '36px', margin: '10px' }}
            />
            {country.name.common}
          </Link>
        );
      })}
    </div>
  );
};

export default CountriesList;
