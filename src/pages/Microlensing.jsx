import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Microlensing = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/microlensing');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch microlensing data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Microlensing</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Planet Name</th>
              <th>Discovery Method</th>
              <th>Orbital Period (days)</th>
              <th>Radius (Jupiter Radii)</th>
              <th>Mass (Jupiter Masses)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.pl_name}</td>
                <td>{item.discoverymethod}</td>
                <td>{item.pl_orbper || 'N/A'}</td>
                <td>{item.pl_radj || 'N/A'}</td>
                <td>{item.pl_massj || 'N/A'}</td>
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

export default Microlensing;