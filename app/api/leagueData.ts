import path from 'path';
import { promises as fs } from 'fs';
import axios from 'axios';

export default async function handler(req: any, res: any) {

    const {leagueId, seasonId} = req.query;

    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/leagueData.json', 'utf8');
    //Return the content of the data file in json format
    //const data = JSON.parse(fileContents);
    
    //res.status(200).json(data);

    let url = "https://v3.football.api-sports.io/standings?league=" + leagueId + "&season=" + seasonId;
    
    //const fs = require('fs');

    await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "b4fa8690ce767c00afe9a6877cc6d796"
            }
        })
        .then(response =>response.json())
        .then(data => {   
            res.status(200).json(data.response[0]);
            
        })
        .catch(err => {
            res.status(500).json(err);
        });
    
}