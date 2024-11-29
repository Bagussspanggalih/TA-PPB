import axios from 'axios';

const BASE_URL = 'https://peta-maritim.bmkg.go.id/public_api/perairan/H.07_Samudera%20Hindia%20selatan%20Jawa%20Tengah.json';

export const getWavesOverview = async () => {
  try {
    const response = await axios.get(BASE_URL);
    
    // Add validation for the response
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching wave data:', error);
    throw error;
  }
};

export default { getWavesOverview };