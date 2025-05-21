import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KELT = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/kelt');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch KELT data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>KELT Time Series</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Target Name</th>
              <th>Observation Date</th>
              <th>Filter</th>
              <th>Magnitude</th>
              <th>Magnitude Error</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.target_name}</td>
                <td>{item.observation_date}</td>
                <td>{item.filter}</td>
                <td>{item.magnitude || 'N/A'}</td>
                <td>{item.magnitude_error || 'N/A'}</td>
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

export default KELT;