import { got } from 'got';

export const matches = {
  queueTypes: { // Refer to RIOT docs queues.json for more types
    400: 'Normal Draft',
    420: 'Ranked Solo',
    440: 'Ranked Flex',
    430: 'Normal Blind',
  },
  async execute(apiKey, matchId) {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`;
    try {
      const response = await got.get(url).json();
      return response;
    } catch (error) {
      console.error(`Error fetching match data: ${error.message}`);
      return null;
    }
  }
}
