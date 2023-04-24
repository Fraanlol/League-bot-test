const { EmbedBuilder } = require('discord.js');

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": `MAURI ACABA DE FINALIZAR UNA PARTIDA`,
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Muy bien mauri`,
      "description": ` `,
      "color": 0xfb0606,
      "fields": [
        {
          "name": `sdasd`,
          "value": "\u200B"
        }
      ],
      "thumbnail": {
        "url": `Esta esd la url de la imagen`,
        "height": 600,
        "width": 600
      },
      "url": `Datosdelapartida.com`
    }
  ]
});

const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('MAURI ACABA DE FINALIZAR UNA PARTIDA')
	.setURL('https://discord.js.org/')
	.setDescription('Ganaste tanta candidad de PL')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });