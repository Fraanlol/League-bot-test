import * as dotenv from 'dotenv'
dotenv.config()

import { summs } from './apiCalls/getBySummId.mjs';
import { matches } from './apiCalls/getMatchList.js';
import { liveGame } from './apiCalls/getLiveMatch.js';
import { Client, Intents } from 'discord.js';
import { readdirSync } from 'fs';
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		],
	});
import cron from 'node-cron';


//Event Handler

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

(async function loadEvents(files){
	for (const file of files) {
		import(`./events/${file}`).then(k => {
			if (k.default.once) {
				client.once(k.default.name, (...args) => k.default.execute(...args));
			} else {
				client.on(k.default.name, (...args) => k.default.execute(...args));
			}
		})
		
	}
})(eventFiles)


//CRON TIMER
let summData = await summs.execute(process.env.api_key, 'valencala'); //JSON With summoner data
let liveData = await liveGame.execute(process.env.api_key,summData.id);
let gameStack = [];
console.log(await matches.execute(process.env.api_key, summData.puuid))
// Check if summoner is in game
if(liveData != 404 && liveData.gameQueueConfigId === 440){
 	//If its in game and its flex
	console.log(liveData)
	//Push to stack
	gameStack.push(liveData.gameId)
}else{
 //If its not in game
	//Check stack
	if(gameStack.length == 0){
		//If empty, do nothing
		console.log('There\'s nothing to do', liveData)
	}else{
		//If have an item, look for the match and run logic
		let summMatch =  await matches.execute(process.env.api_key, summData.puuid); // ARRAY with last flex game
		//Figure how to get LP gain and loss
	}
}
client.login(process.env.bot_token);




