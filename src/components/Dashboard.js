import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import '../Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/visualization');
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredData = data.filter(item => {
    return Object.keys(filters).every(filter => 
      !filters[filter] || item[filter]?.toString().toLowerCase().includes(filters[filter].toLowerCase())
    );
  });

  return (
    <div className="dashboard">
      <h1>Data Visualization Dashboard</h1>
      <div className="filters">
        <input name="endYear" placeholder="End Year" onChange={handleFilterChange} />
        <input name="topic" placeholder="Topic" onChange={handleFilterChange} />
        <input name="sector" placeholder="Sector" onChange={handleFilterChange} />
        <input name="region" placeholder="Region" onChange={handleFilterChange} />
        <input name="pest" placeholder="PEST" onChange={handleFilterChange} />
        <input name="source" placeholder="Source" onChange={handleFilterChange} />
        <input name="swot" placeholder="SWOT" onChange={handleFilterChange} />
        <input name="country" placeholder="Country" onChange={handleFilterChange} />
        <input name="city" placeholder="City" onChange={handleFilterChange} />
      </div>
      <Chart data={filteredData} />
    </div>
  );
};

export default Dashboard;
