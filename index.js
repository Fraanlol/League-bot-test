import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import { readdirSync } from 'fs';
import cron from 'node-cron';
import { summs } from './apiCalls/getBySummId.mjs';
import { matches } from './apiCalls/getMatch.js';
import { liveGame } from './apiCalls/getLiveMatch.js';
import { getLP } from './apiCalls/getLp.js';

dotenv.config();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

// Event Handler
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

async function loadEvents(files) {
  for (const file of files) {
    const { default: event } = await import(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

loadEvents(eventFiles);

// Cron Timer
const gameStack = [['LA2_1288836336',60]];

async function handleMatch() {
  try {
    const summData = await summs.execute(process.env.api_key, 'LaBasuraItaliana');
    const liveData = await liveGame.execute(process.env.api_key, summData.id);
    
    if (liveData && liveData.gameQueueConfigId === 440) {
      // If summoner is in game and it's flex
      console.log('Mauri esta en partido');
      client.channels.cache.get('796950380159303712').send('Mauri esta en partido')
      
      // Push to stack
      gameStack.push([liveData.gameId, await getLP.execute(process.env.api_key, summData.id)]);
    } else {
      console.log('Mauri no esta en partida');
      // If it's not in game, check stack
      if (gameStack.length > 0) {
        // If there's an item, look for the match and run logic
        const summMatch = await matches.execute(process.env.api_key, gameStack[0][0]);
        const summParticipant = summMatch.info.participants.find(participant => participant.puuid === summData.puuid);
        
        if (summParticipant) {
          const win = summParticipant.win;
          // Send message of win or lose
          const response = await getLP.execute(process.env.api_key, summData.id);
          
          if (win) {
            client.channels.cache.get('796950380159303712').send(`Mauri gano seguro lo carrearon (Gano ${response - gameStack[0][1]} LP)`);
          } else {
            client.channels.cache.get('796950380159303712').send(`Mauri perdio alto pt (Perdio ${gameStack[0][1] - response} LP)`);
          }
          
          gameStack.shift();
        } else {
          console.log(`Mauri no participo en el juego ${gameStack[0][0]}`);
        }
      } else {
        console.log('There is nothing to do');
      }
    }
  } catch (error) {
    console.error(error);
  }
}

handleMatch()
cron.schedule('*/5 * * * *', handleMatch); // Run handleMatch every 5 minutes
client.login(process.env.bot_token);
