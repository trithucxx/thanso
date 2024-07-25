const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/proxy', async (req, res) => {
  try {
    const { fullName, dateOfBirth } = req.query;
    const apiUrl = `https://openapi.cozeable.com/numerology/?fullName=${encodeURIComponent(fullName)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`;
    
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));