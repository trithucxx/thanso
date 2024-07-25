const axios = require('axios');

exports.handler = async function(event, context) {
  // Xử lý CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { fullName, dateOfBirth } = event.queryStringParameters;
    
    if (!fullName || !dateOfBirth) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Gọi API thực tế
    const apiUrl = `https://openapi.cozeable.com/numerology/?fullName=${encodeURIComponent(fullName)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`;
    const response = await axios.get(apiUrl);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: error.message })
    };
  }
};