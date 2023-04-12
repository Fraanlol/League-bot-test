// This API Call is used to get account data like summoner ID
import { got } from 'got';

export const ob = {
     async execute(apiKey) {
        let url = `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/LaBasuraItaliana?api_key=${apiKey}`
        return got.get(url).json();
     }
}