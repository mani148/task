import api from "./api";

export const submitPrediction = async (data: {
    gameId: number;
    selectedTeam: string;
}) => {
    const response = await api.post('/predictions', data);
    return response.data;
};