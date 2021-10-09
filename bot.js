const {Client, Intents, Collection} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
    allowedMentions: {parse: ['users']}
});
const fs = require('fs');
const chalk = require('chalk');
const success = chalk.bold.green;
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
client.models = new Collection();
client.prefix = process.env['DISCORD_PREFIX'];
client.db = mongoose.connection;

const commandFolders = fs.readdirSync('./commands')
const eventFolders = fs.readdirSync('./events/')
const modelFolders = fs.readdirSync('./models/')

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

for (const folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

for (const folder of modelFolders) {
    const modelFiles = fs.readdirSync(`./models/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of modelFiles) {
        const model = require(`./models/${folder}/${file}`);
        client.models.set(model.name, model.data)
    }
}

client.login(process.env['DISCORD_TOKEN']);