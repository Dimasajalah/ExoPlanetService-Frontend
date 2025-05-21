import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KeplerNames = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/kepler-names');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch Kepler confirmed names data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Kepler Confirmed Names</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Kepler Name</th>
              <th>KOI Name</th>
              <th>Disposition</th>
              <th>Predicted Disposition</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.kepler_name}</td>
                <td>{item.koi_name}</td>
                <td>{item.koi_disposition}</td>
                <td>{item.koi_pdisposition}</td>
                <td>{item.koi_score || 'N/A'}</td>
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

export default KeplerNames;