// This API Call is used to get data from a live match
import { got } from 'got';

export const liveGame = {
  queueTypes: { // Refer to RIOT docs queues.json for more types
    400: 'Normal Draft',
    420: 'RANKED_SOLO_5x5',
    440: 'RANKED_FLEX_SR',
    430: 'Normal Blind',
  },
  async execute(apiKey, summId) {
    try {
      const url = `https://la2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summId}?api_key=${apiKey}`;
      const response = await got.get(url).json();
      return [response, this.queueTypes[response.gameQueueConfigId]];
    } catch (error) {
      return error.response.statusCode;
    }
  },
};
