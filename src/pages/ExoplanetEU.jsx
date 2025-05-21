import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExoplanetEU = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/exoplanet-eu');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data from Exoplanet.eu API');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Exoplanet.eu Data</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Planet Name</th>
              <th>Mass (Jupiter Masses)</th>
              <th>Radius (Jupiter Radii)</th>
              <th>Semi-Major Axis (AU)</th>
              <th>Orbital Period (days)</th>
              <th>Star Name</th>
              <th>Star Distance (pc)</th>
              <th>Star Mass (Solar Masses)</th>
              <th>Star Radius (Solar Radii)</th>
              <th>Star Temperature (K)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((planet, index) => (
              <tr key={index}>
                <td>{planet.target_name || 'N/A'}</td>
                <td>{planet.mass || 'N/A'}</td>
                <td>{planet.radius || 'N/A'}</td>
                <td>{planet.semi_major_axis || 'N/A'}</td>
                <td>{planet.period || 'N/A'}</td>
                <td>{planet.star_name || 'N/A'}</td>
                <td>{planet.star_distance || 'N/A'}</td>
                <td>{planet.star_mass || 'N/A'}</td>
                <td>{planet.star_radius || 'N/A'}</td>
                <td>{planet.star_teff || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ExoplanetEU;