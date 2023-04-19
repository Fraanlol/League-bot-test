// This API Call is used to get the lp ammount of the user
import { got } from 'got';

export const getLP = {
     async execute(apiKey,summId) {
        try{
            let url = `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${summId}?api_key=${apiKey}`
            let rp = await got.get(url).json();
            let lp;
            rp.forEach(element => {
                if(element.queueType === 'RANKED_FLEX_SR'){
                    lp = element.leaguePoints;
                }
            })
            return lp;
        } catch(err){
            return err.response;
        }
     }
}