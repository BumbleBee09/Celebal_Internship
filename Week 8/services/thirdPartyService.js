const axios = require('axios');

async function getExternalData() {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/images/search'); // put any api here
    return response.data;
  } catch (error) {
    throw new Error('Error fetching external data');
  }
}

module.exports = { getExternalData };
