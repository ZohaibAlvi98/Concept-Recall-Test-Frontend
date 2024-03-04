const BASE_URL_LOCAL = 'http://localhost:4040'; // Replace with your actual local backend port
const BASE_URL_LIVE = 'https://your-live-backend-url'; // Replace with your actual live backend URL

const getBaseUrl = () => {
  // Determine the environment (you might want to use process.env.NODE_ENV or another method)
  const isLocal = process.env.NODE_ENV === 'development';

  return isLocal ? BASE_URL_LOCAL : BASE_URL_LIVE;
};

const getImageUrl = (filename) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/images/project/${filename}`;
};

export { getImageUrl };