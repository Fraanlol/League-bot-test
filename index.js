import * as dotenv from 'dotenv'
dotenv.config()

import { ob } from './apiCalls/getBySummId.mjs';
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

console.log( await ob.execute(process.env.api_key))

client.login(process.env.bot_token);




