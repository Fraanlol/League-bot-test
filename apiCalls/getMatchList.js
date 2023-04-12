// This API Call is used to get a list of recent matches
import { got } from 'got';

export const matches = {
   queueTypes : {  // Refer to RIOT docs queues.json for more types
      400:'Normal Draft',
      420:'Ranked Solo',
      440:'Ranked Flex',
      430:'Normal Blind',
   },
     async execute(apiKey,uid) {
        let url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${uid}/ids?queue=440&start=0&count=1&api_key=${apiKey}`
        return got.get(url).json();
     }
}