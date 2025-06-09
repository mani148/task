import api from './api';

export const fetchGames = async () => {
  const response = await api.get('/games'); // from local host
  return response.data;
};

export const fetchProfile = async () => {
  const response = await api.get('/user'); // from local host
  return response.data;
};

export const submitPrediction = async (data: {
  gameId: string;
  selectedTeam: string;
}) => {
  const response = await api.post('/predictions', data);
  return response.data;
};

