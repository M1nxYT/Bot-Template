const {Client, Intents, Collection} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
    allowedMentions: {parse: ['users']}
});
const fs = require('fs');
const chalk = require('chalk');
const error = chalk.bold.red;
const verifyenv = require('./utils/verifyenv')
require('dotenv').config()

if(verifyenv().length > 0){
    return console.log(error(`The following variable/s are missing from your .env file:\n${verifyenv().join(', ')}`))
}

const mongoose = require('mongoose');
mongoose.connect(process.env['MONGO_URL']);


client.commands = new Collection();
client.events = new Collection();
client.prefix = process.env['DISCORD_PREFIX'];
client.db = mongoose.connection;

const commandFolders = fs.readdirSync('./commands')
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(process.env['DISCORD_TOKEN']);