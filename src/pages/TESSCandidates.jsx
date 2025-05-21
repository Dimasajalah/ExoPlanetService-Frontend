import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TESSCandidates = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tess-candidates');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch TESS candidates data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>TESS Candidates</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>TIC ID</th>
              <th>TOI</th>
              <th>Planet Name</th>
              <th>Orbital Period (days)</th>
              <th>Radius (Jupiter Radii)</th>
              <th>Stellar Temperature (K)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.tic_id}</td>
                <td>{item.toi}</td>
                <td>{item.pl_name}</td>
                <td>{item.pl_orbper || 'N/A'}</td>
                <td>{item.pl_radj || 'N/A'}</td>
                <td>{item.st_teff || 'N/A'}</td>
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

export default TESSCandidates;