const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed()
    .setColor('#00ff00') // hex code color
    .setTitle('Pong!')
    .addFields(
        { name: '🌐 API Latency', value: 'Loading...', inline: false },
        { name: '🏓 Roundtrip Latency', value: 'Loading...', inline: false },
    )
    .setTimestamp()

module.exports = {
    name: 'ping', // The name of the command. (This will be displayed on the help info for this command)
    description: 'ping command!', // The description of the command. (This will be displayed on the help info for this command)
    category: 'essential', // The sort category of the command (This will be displayed on the help info for this command)
    usage: '{prefix}ping []', // Command usages should be formated as '{prefix}commandname [arg1 arg2 arg3 etc]'. (This will be displayed on the help info for this command)
    perms : ['SEND_MESSAGES', 'MANAGE_MESSAGES'], // What permissions the user requires to run the command. (A full list of these permissions can be found here https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)
    hidden: true, // Don't respond to failed attempts at running this command and hide it from help commands. (Do not add slash command data for the command if this is true)
    autodefer: false, // Gives you more time to process a response. (Sometimes manual is better though. Has no effect on commands ran with a prefixed message)
    ephemeral: false, // If autodefer is enabled, this will set whether or not your slash replies are ephemeral. (Has no effect on commands ran with a prefixed message)
    data: new SlashCommandBuilder().setName('ping').setDescription('test command!'), // Match the information above. (This will be displayed on the help info for this command and in the commands section in the user's client)
    prefixExecute(client, message) { // Runs when the command is ran from a message.
        embed.fields[0].value = 'Loading...';
        embed.fields[1].value = 'Loading...';
        message.reply({ embeds: [embed] }).then((msg) => {
            embed.fields[0].value = `\`${Math.round(client.ws.ping)}ms\``;
            embed.fields[1].value = `\`${msg.createdTimestamp - message.createdTimestamp}ms\``;
            msg.edit({embeds: [embed]});
        })
    },
    slashExecute(client, interaction) { // Runs when the command is ran from a slash command.
        embed.fields[0].value = 'Loading...';
        embed.fields[1].value = 'Loading...';
        interaction.reply({ embeds: [embed] })
        interaction.fetchReply().then((msg) =>{
            embed.fields[0].value = `\`${Math.round(client.ws.ping)}ms\``;
            embed.fields[1].value = `\`${msg.createdTimestamp - interaction.createdTimestamp}ms\``;
            interaction.editReply({ embeds: [embed] })
        });
    },
};
