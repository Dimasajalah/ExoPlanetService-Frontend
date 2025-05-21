import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StellarHosts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/stellar-hosts');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch stellar hosts data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Stellar Hosts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Host Star</th>
              <th>Temperature (K)</th>
              <th>Mass (Solar Masses)</th>
              <th>Radius (Solar Radii)</th>
              <th>Age (Gyr)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.hostname}</td>
                <td>{item.st_teff || 'N/A'}</td>
                <td>{item.st_mass || 'N/A'}</td>
                <td>{item.st_rad || 'N/A'}</td>
                <td>{item.st_age || 'N/A'}</td>
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

export default StellarHosts;