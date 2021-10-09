const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const capitalize = require('../../utils/capitalize')

module.exports = {
    name: 'help',
    description: 'A simple help command!',
    category: 'Essential',
    usage: '{prefix}help command',
    perms : ['SEND_MESSAGES'],
    hidden: false,
    autodefer: true,
    ephemeral: true,
    data: new SlashCommandBuilder().setName('help').setDescription('A simple help command!').addStringOption(option =>
        option.setName('command').setDescription('Get help about a specific command!').setRequired(false)
    ),
    prefixExecute(client, message, args) {
        let commandName = args[0];
        let embed = new MessageEmbed().setTimestamp();

        if(!commandName){
            embed.setTitle('Help').setColor('#00ff00');
            const essential = client.commands.filter(x => x.category == 'Essential').map((x) => '`' + x.name + '`').join(',  ');
            embed.addField('Essential', essential, false);
            // const misc = client.commands.filter(x => x.category == 'Misc').map((x) => x.icon + '  `' + x.name + '`').join(',  ');
            // embed.addField('Miscellaneous', misc, false);
            return message.reply({ embeds: [embed] })
        }
        else{
            if (!client.commands.has(commandName)) {
                embed.setTitle('Help').setColor('#ff0000');
                embed.description = 'That command could not be found!';
                return message.reply({ embeds: [embed] });
            }
            else{
                let cmd = client.commands.get(commandName);
                let cmdUsageRaw = cmd.usage.split(' ');
                let cmdUsage = cmdUsageRaw.shift().replace('{prefix}', client.prefix);
                let cmdArgs = `\`${cmdUsageRaw.join('` `')}\``.replace('``', '');
                if(cmd.hidden){
                    embed.setTitle('Help').setColor('#ff0000');
                    embed.description = 'That command could not be found!';
                    return message.reply({ embeds: [embed] });
                }
                else{
                    embed.setTitle(capitalize(cmd.name)).setColor('#00ff00');
                    embed.addField('Description', `\`${capitalize(cmd.description)}\``, false);
                    embed.addField('Usage', `\`${cmdUsage}\` ${cmdArgs}`, false);
                    embed.addField('Permissions', `\`${cmd.perms.join('` `')}\``, false);
                    embed.addField('Category', `\`${capitalize(cmd.category)}\``, false);
                    return message.reply({ embeds: [embed] });
                }

            }
        }

    },
    slashExecute(client, interaction, args) {
        let commandName = interaction.options.get('command')?.value;
        let embed = new MessageEmbed().setColor('#00ff00').setTimestamp();

        if(!commandName){
            embed.setTitle('Help');
            const essential = client.commands.filter(x => x.category == 'Essential').map((x) => '`' + x.name + '`').join(',  ');
            embed.addField('Essential', essential, false);
            // const misc = client.commands.filter(x => x.category == 'Misc').map((x) => x.icon + '  `' + x.name + '`').join(',  ');
            // embed.addField('Miscellaneous', misc, false);
            return interaction.followUp({ embeds: [embed] })
        }
        else{
            if (!client.commands.has(commandName)) {
                embed.setTitle('Help');
                embed.description = 'That command could not be found!';
                return interaction.followUp({ embeds: [embed] });
            }
            else{
                let cmd = client.commands.get(commandName);
                let cmdUsageRaw = cmd.usage.split(' ');
                let cmdUsage = cmdUsageRaw.shift().replace('{prefix}', client.prefix);
                let cmdArgs = `\`${cmdUsageRaw.join('` `')}\``.replace('``', '');
                if(cmd.hidden){
                    embed.setTitle('Help');
                    embed.description = 'That command could not be found!';
                    return interaction.followUp({ embeds: [embed] });
                }
                else{
                    embed.setTitle(capitalize(cmd.name));
                    embed.addField('Description', `\`${capitalize(cmd.description)}\``, false);
                    embed.addField('Usage', `\`${cmdUsage}\` ${cmdArgs}`, false);
                    embed.addField('Permissions', `\`${cmd.perms.join('` `')}\``, false);
                    embed.addField('Category', `\`${capitalize(cmd.category)}\``, false);
                    return interaction.followUp({ embeds: [embed] });
                }

            }
        }
    },
};
