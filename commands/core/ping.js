const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
let embed = new MessageEmbed()
    .setTitle('Pong!')
    .addFields(
        { name: '🌐 API Latency', value: 'Loading...', inline: false },
        { name: '🏓 Roundtrip Latency', value: 'Loading...', inline: false },
    )
    .setTimestamp()

module.exports = {
    name: 'ping', // The name of the command. (This will be displayed on the help info for this command)
    description: 'A simple ping command!', // The description of the command. (This will be displayed on the help info for this command)
    category: 'Essential', // The sort category of the command (This will be displayed on the help info for this command) ( note: If set to a category not in the help command the command will be hidden when running the help command)
    usage: '{prefix}ping', // Command usages should be formated as '{prefix}commandname arg1 arg2 arg3 etc'. (This will be displayed on the help info for this command)
    perms : ['SEND_MESSAGES'], // What permissions the user requires to run the command. (A full list of these permissions can be found here https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)
    hidden: false, // Don't respond to failed attempts at running this command and hide it from help commands. (Do not add slash command data for the command if this is true)
    autodefer: false, // Gives you more time to process a response. (Sometimes manual is better though. Has no effect on commands ran with a prefixed message)
    ephemeral: false, // If autodefer is enabled, this will set whether or not your slash replies are ephemeral. (Has no effect on commands ran with a prefixed message)
    data: new SlashCommandBuilder().setName('ping').setDescription('A simple ping command!'), // Match the information above. (This will be displayed on the help info for this command and in the commands section in the user's client)
    prefixExecute(client, message, args) { // Runs when the command is ran from a message.
        embed.fields[0].value = 'Loading...';
        embed.fields[1].value = 'Loading...';
        embed.setColor('#ff8800') // hex code color
        message.reply({ embeds: [embed] }).then((msg) => {
            embed.setColor('#00ff00') // hex code color
            embed.fields[0].value = `\`${Math.round(client.ws.ping)}ms\``;
            embed.fields[1].value = `\`${msg.createdTimestamp - message.createdTimestamp}ms\``;
            msg.edit({embeds: [embed]});
        })
    },
    slashExecute(client, interaction, args) { // Runs when the command is ran from a slash command.
        embed.fields[0].value = 'Loading...';
        embed.fields[1].value = 'Loading...';
        embed.setColor('#ff8800') // hex code color
        interaction.reply({ embeds: [embed] })
        interaction.fetchReply().then((msg) =>{
            embed.setColor('#00ff00') // hex code color
            embed.fields[0].value = `\`${Math.round(client.ws.ping)}ms\``;
            embed.fields[1].value = `\`${msg.createdTimestamp - interaction.createdTimestamp}ms\``;
            interaction.editReply({ embeds: [embed] })
        });
    },
};
