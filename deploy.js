const { REST }  = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const fs = require('fs');

const rest = new REST().setToken(process.env['DISCORD_TOKEN']);
const commands = [];

const commandFolders = fs.readdirSync('./commands')
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        if(command.data){
            commands.push(command.data.toJSON());
        }
        console.log(`Refreshed: ${file}`)
    }
}

(async() => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands( process.env['DISCORD_CLIENT_ID'],  process.env['DISCORD_GUILD_ID']), { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();