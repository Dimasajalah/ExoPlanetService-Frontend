import React, { useState } from 'react';
import axios from 'axios';

const RadialVelocityPredictor = () => {
  const [data, setData] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/predict", {
        radial_velocity: data.split(",").map(Number), // Convert input to array of numbers
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      setPrediction("Error making prediction");
    }
  };

  return (
    <div>
      <h1>Radial Velocity Predictor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Enter radial velocity data, separated by commas"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <br />
        <button type="submit">Predict</button>
      </form>
      {prediction && <h2>Prediction: {prediction}</h2>}
    </div>
  );
};

export default RadialVelocityPredictor;