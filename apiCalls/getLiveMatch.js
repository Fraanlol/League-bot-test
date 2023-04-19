// This API Call is used to get data from a live match
import { got } from 'got';

export const liveGame = {
  async execute(apiKey, summId) {
    try {
      const url = `https://la2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summId}?api_key=${apiKey}`;
      const response = await got.get(url).json();
      return response;
    } catch (error) {
      return error.response.statusCode;
    }
  },
};
