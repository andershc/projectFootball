// Firebase User Schema
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  username: string;
  points: number;
}

export interface GuessResult {
  completed: boolean | null;
  guessedPlayers: Player[];
  guesses: number;
  points: number;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Standings {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  form: string;
  status: string;
  description: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  update: string;
}

export interface LeagueData {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: Standings[][];
  };
}
export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  age: number;
  position: string;
  photo: string;
  season: number;
  team: Team;
  nationality: string;
  league: League;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
}

export interface TransferData {
  date: string;
  teams: Teams;
  type: string;
}

export interface Teams {
  in: Team;
  out: Team;
}

export interface DailyPlayer {
  player: Player;
  transferData: TransferData[];
  totalAttempts: number;
  totalCorrect: number;
}

export interface DailyPlayerStats {
  totalAttempts: number;
  totalCorrect: number;
}
