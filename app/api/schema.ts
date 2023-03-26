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
export interface PlayerMetaData {
  age: number,
  birth: {
    country: string,
    date: string,
    place: string,
  },
  firstname: string,
  height: string,
  id: number,
  injured: boolean,
  lastname: string,
  name: string,
  nationality: string,
  photo: string,
  weight: string,
}

export interface Player {
  player: PlayerMetaData,
  statistics: any[]
}

export interface PlayerData {
  errors: string[],
  paging: {
    current: number,
    total: number,
  },
  parameters: {
    league: number,
    season: number,
  },
  response: Player[]
  results: number,
}

export interface PlayersResponse {
  players: PlayerData
}
