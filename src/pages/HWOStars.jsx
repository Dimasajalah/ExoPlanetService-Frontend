import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HWOStars = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/hwo-stars');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch HWO ExEP Precursor Science Stars data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>HWO ExEP Precursor Science Stars</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Star Name</th>
              <th>RA</th>
              <th>Dec</th>
              <th>Distance (pc)</th>
              <th>Stellar Mass (Solar Masses)</th>
              <th>Stellar Radius (Solar Radii)</th>
              <th>Stellar Temperature (K)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.star_name}</td>
                <td>{item.ra}</td>
                <td>{item.dec}</td>
                <td>{item.distance || 'N/A'}</td>
                <td>{item.stellar_mass || 'N/A'}</td>
                <td>{item.stellar_radius || 'N/A'}</td>
                <td>{item.stellar_temperature || 'N/A'}</td>
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

export default HWOStars;