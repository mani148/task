export interface Team {
  name: string;
  abbreviation: string;
  record: string;
  score?: number;
}

export interface Odds {
  spread: string;
  favorite: string;
}

export type GameStatus = 'scheduled' | 'inProgress' | 'final';

export interface Game {
  id: string;
  status: GameStatus;
  startTime: string;
  homeTeam: Team;
  awayTeam: Team;
  odds?: Odds;
  period?: string;
  clock?: string;
  winner?: string;
}

export interface Prediction {
  gameId: string;
  pick: string;
  amount: number;
  result: 'win' | 'loss' | 'pending';
  payout?: number; // optional for pending predictions
}

export interface UserStats {
  wins: number;
  losses: number;
  pending: number;
}

export interface User {
  id: string;
  username: string;
  balance: number;
  predictions: Prediction[];
  stats: UserStats;
}


export const GAME_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'inprogress',
  FINAL: 'final',
};