// This API Call is used to get data from a live match
import { got } from 'got';

export const liveGame = {
     async execute(apiKey,summId) {
        try{
            let url = `https://la2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summId}?api_key=${apiKey}`
             return await got.get(url).json();
        } catch(err){
            return err.response.statusCode;
        }
     }
}