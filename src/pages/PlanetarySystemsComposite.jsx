import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlanetarySystemsComposite = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/pscomppars');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch planetary systems composite parameters data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Planetary Systems Composite Parameters</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Planet Name</th>
              <th>Host Star</th>
              <th>Discovery Method</th>
              <th>Orbital Period (days)</th>
              <th>Radius (Jupiter Radii)</th>
              <th>Equilibrium Temperature (K)</th>
              <th>Stellar Temperature (K)</th>
              <th>Stellar Mass (Solar Masses)</th>
              <th>Stellar Radius (Solar Radii)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.pl_name}</td>
                <td>{item.hostname}</td>
                <td>{item.discoverymethod}</td>
                <td>{item.pl_orbper || 'N/A'}</td>
                <td>{item.pl_radj || 'N/A'}</td>
                <td>{item.pl_eqt || 'N/A'}</td>
                <td>{item.st_teff || 'N/A'}</td>
                <td>{item.st_mass || 'N/A'}</td>
                <td>{item.st_rad || 'N/A'}</td>
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

export default PlanetarySystemsComposite;