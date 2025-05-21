import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KOICumulative = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/koi-cumulative');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch KOI Cumulative Delivery data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>KOI Cumulative Delivery</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Kepler ID</th>
              <th>KOI Name</th>
              <th>Disposition</th>
              <th>Orbital Period (days)</th>
              <th>Planet Radius (Earth Radii)</th>
              <th>Stellar Mass (Solar Masses)</th>
              <th>Stellar Radius (Solar Radii)</th>
              <th>Stellar Temperature (K)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.kepid}</td>
                <td>{item.kepoi_name}</td>
                <td>{item.koi_disposition}</td>
                <td>{item.koi_period || 'N/A'}</td>
                <td>{item.koi_prad || 'N/A'}</td>
                <td>{item.koi_smass || 'N/A'}</td>
                <td>{item.koi_srad || 'N/A'}</td>
                <td>{item.koi_steff || 'N/A'}</td>
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

export default KOICumulative;