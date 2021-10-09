const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Collection} = require('discord.js');
const capitalize = require('../../utils/capitalize')
const fs = require("fs");

module.exports = {
    name: 'reload',
    description: 'Owner only - Reloads all commands!',
    category: 'Owner', // WARNING: Do not add this category to the help command unless you wish to expose owner only commands to the response
    usage: '{prefix}',
    perms : ['ADMINISTRATOR'],
    hidden: true,
    autodefer: true,
    ephemeral: true,
    prefixExecute(client, message, args) {
        let author = message.author
        if(author.id != process.env['OWNER_ID']){return}
        client.commands = new Collection();
        const commandFolders = fs.readdirSync('./commands/')
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                delete require.cache[require.resolve(`../../commands/${folder}/${file}`)];
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.name, command);
            }
        }
        return message.reply({content: 'Successfully reload all commands!'})
    },
    slashExecute(client, interaction, args) {
        // no slash version of this due to it needing to be hidden
    },
};
