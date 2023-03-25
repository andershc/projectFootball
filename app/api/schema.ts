// Firebase User Schema
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}

export interface Team {
    id: number;
    name: string;
    logo: string;
}

export interface Standings {
  rank: number,
  team: Team,
  points: number,
  goalsDiff: number,
  form: string,
  status: string,
  description: string,
  all: {
    played: number,
    win: number,
    draw: number,
    lose: number,
    goals: {
      for: number,
      against: number,
    },
  },
  home: {
    played: number,
    win: number,
    draw: number,
    lose: number,
    goals: {
      for: number,
      against: number,
    },
  },
  away: {
    played: number,
    win: number,
    draw: number,
    lose: number,
    goals: {
      for: number,
      against: number,
    },
  },
  update: string,
}

export interface LeagueData {
  league: {
    id: number,
    name: string,
    country: string,
    logo: string,
    flag: string,
    season: number,
    standings: Standings[][],
  }
  
  
}

export interface Player {
  id: number,
  name: string,
  nationality: string,
  club: string,
  flag: string,
}
