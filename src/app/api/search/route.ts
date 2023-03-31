import { NextResponse } from "next/server";

import getAllPlayers from "../../../../firebase/firestore/getAllPlayers";

import players from '../../../json/search.json';

export async function GET(req: Request): Promise<NextResponse> {
    console.log('Search request:', req.url);
    try {
      const { searchParams } = new URL(req.url);
      const name = searchParams.get("name");
        
      const filteredPlayers = players.filter((p) => {
        return p.name.toLowerCase().includes(name?.toLowerCase() ?? "");
      });
  
      return NextResponse.json(filteredPlayers.slice(0, 10));
    } catch (error) {
      console.log("Error" + error);
      return NextResponse.json([]);
    }
  }