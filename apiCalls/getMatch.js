import { got } from 'got';

export const matches = {
  async execute(apiKey, matchId,) {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/LA2_${matchId}?api_key=${apiKey}`;
    try {
      const response = await got.get(url).json();
      return response;
    } catch (error) {
      console.error(`Error fetching match data: ${error.message}`);
      return null;
    }
  }
}
