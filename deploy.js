// noinspection JSClosureCompilerSyntax

const { REST }  = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;
const verifyenv = require('./utils/verifyenv')
require('dotenv').config();

if(verifyenv().length > 0){
    return console.log(error(`The following variable/s are missing from your .env file:\n${verifyenv().join(', ')}`))
}

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
        console.log(success`Refreshed: ${file}`)
    }
}

(async() => {
    try {
        console.log(success`Started refreshing application (/) commands.`);

        // guild
        await rest.put(
            Routes.applicationGuildCommands( process.env['DISCORD_CLIENT_ID'],  process.env['DISCORD_GUILD_ID']), { body: commands },
        );

        // global
        // await rest.put(
        //     Routes.applicationGuildCommands( process.env['DISCORD_CLIENT_ID']), { body: commands },
        // );


        console.log(success`Successfully reloaded application (/) commands.`);
    } catch (err) {
        console.error(error`${err}`);
    }
})();