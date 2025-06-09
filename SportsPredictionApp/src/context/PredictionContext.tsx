import React, { createContext, useContext, useState } from 'react'
import { submitPrediction } from '../service/services'

//type PredictionType = 'home' | 'away' | 'spread';

type Prediction = {
gameId: string,
selectedTeam: string,
predictionType: string;
}

type ContextType = {
    prediction: Prediction |  null,
    makePrediction: (gameId: string, selectedTeam: string, predictionType: string) => void
    resetPrediction: () => void
}

const PredictionContext = createContext<ContextType>({
    prediction: null,
    makePrediction: () =>{},
    resetPrediction: () => {}
});

export const usePrediction = () => useContext(PredictionContext);

const PredictionProvider = ({ children }:  { children: React.ReactNode }) => {

    const [prediction, setPrediction] = useState<Prediction | null>(null);

    const makePrediction = async (gameId: string, selectedTeam: string, predictionType: string) => {
        const newPrediction = { gameId, selectedTeam, predictionType };
        await submitPrediction(newPrediction);
        setPrediction(newPrediction);
      };

    const resetPrediction = () => {
        setPrediction(null);
      };

    return (
        <PredictionContext.Provider value={{ prediction, makePrediction, resetPrediction }}>
            {children}
        </PredictionContext.Provider>
      );
}

export default PredictionProvider