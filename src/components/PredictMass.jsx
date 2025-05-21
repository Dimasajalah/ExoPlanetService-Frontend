import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictMass = () => {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [features, setFeatures] = useState({ pl_orbper: '', pl_rade: '', st_teff: '', model: 'random_forest' });
  const [predictedMass, setPredictedMass] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch daftar dataset dari backend
    axios.get('/api/datasets')
      .then(response => setDatasets(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleDatasetChange = (e) => {
    setSelectedDataset(e.target.value);
  };

  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!selectedDataset) {
      setError('Please select a dataset.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/predict_mass', {
        dataset: selectedDataset,
        pl_orbper: parseFloat(features.pl_orbper),
        pl_rade: parseFloat(features.pl_rade),
        st_teff: parseFloat(features.st_teff),
        model: features.model,
      });
      setPredictedMass(response.data.predicted_mass);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setPredictedMass(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Predict Planet Mass</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Dataset:
          <select value={selectedDataset} onChange={handleDatasetChange} required>
            <option value="">-- Select a Dataset --</option>
            {datasets.map((dataset, index) => (
              <option key={index} value={dataset}>{dataset}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Orbital Period (days):
          <input
            type="number"
            name="pl_orbper"
            value={features.pl_orbper}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Planet Radius (Earth radii):
          <input
            type="number"
            name="pl_rade"
            value={features.pl_rade}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Stellar Temperature (K):
          <input
            type="number"
            name="st_teff"
            value={features.st_teff}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Model:
          <select name="model" value={features.model} onChange={handleChange}>
            <option value="random_forest">Random Forest</option>
            <option value="xgboost">XGBoost</option>
          </select>
        </label>
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Predict</button>
      </form>
      {loading && <p>Loading...</p>}
      {predictedMass !== null && <h2>Predicted Mass: {predictedMass} Earth masses</h2>}
      {error && <h2 style={{ color: 'red' }}>Error: {error}</h2>}
    </div>
  );
};

export default PredictMass;