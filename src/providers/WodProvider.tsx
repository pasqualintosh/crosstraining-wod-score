import React from 'react';
import useLocalStorage from './../helpers/useLocalStorage';

type WodProviderProps = {};
type WodContextState = {
  getCurrentScores: () => Array<Score>;
  setCurrentScores: (scores: Array<Score>) => void;
};

export interface Score {
  id: string | number;
  wod: string;
  time?: {
    minutes?: number;
    seconds?: number;
  };
  reps?: number;
}

const WodProviderContext = React.createContext<WodContextState | undefined>(
  undefined,
);

export const WodProvider: React.FC<WodProviderProps> = ({
  children,
}): JSX.Element => {
  const defaultScores: Array<Score> = [];
  const [scores, setScores] = useLocalStorage('score', defaultScores);

  const getCurrentScores = (): Array<Score> => {
    return scores;
  };

  const setCurrentScores = (scores: Array<Score>): void => {
    setScores([...scores]);
  };

  return (
    <WodProviderContext.Provider
      value={{
        getCurrentScores,
        setCurrentScores,
      }}>
      {children}
    </WodProviderContext.Provider>
  );
};

export const useWodProviderContext = (): WodContextState => {
  const context = React.useContext(WodProviderContext);

  if (context === undefined) {
    throw new Error('WodProviderContext must be used with a Provider');
  }

  return context;
};
