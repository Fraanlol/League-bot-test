// This API Call is used to get account data like summoner ID
import { got } from 'got';

export const summs = {
     async execute(apiKey, summName) {
      try{
         let url = `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summName.split(' ').join('+')}?api_key=${apiKey}`
         return got.get(url).json();
      } catch(err){
         return err.response.statusCode
      }
     }
}

