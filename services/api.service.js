import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (code) => {
  console.log(`code: ${code}`)
  switch (code) {
    case 1000:
      return '☀️';
    case 1003:
      return '🌤️';
    case 1006:
      return '☁️';
    case 1063:
      return '☁️';
    case 1240:
      return '🌧️';
    case 1012:
      return '🌦️';
    case 1015:
      return '🌩️';
    case 1018:
      return '❄️';
    case 1021:
      return '🌫️';
  }
};

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
  }
  const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json';
  const params = new URLSearchParams({
    q: city,
    key: token,
    lang: 'ru'
  });
  const url = `${weatherApiUrl}?${params}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export { getWeather, getIcon };
