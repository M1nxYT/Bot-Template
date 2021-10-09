const permCheck = require("../../utils/checkpermission");

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        if (!interaction.isCommand() || !interaction.guildId) return;
        if (!interaction.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

        if (!client.commands.has(interaction.commandName))
            return message.reply(`Command not found!`);
        else {
            let cmd = client.commands.get(interaction.commandName)
            if (!permCheck(interaction.member, cmd.perms)) {
                interaction.deferReply()
                return interaction.followUp(`To run this command you need the following permissions:\n \`${cmd.perms.join('` `')}` + '`');
            }
            if (cmd.autodefer === false) {
                cmd.slashExecute(client, interaction);
            } else {
                interaction.deferReply({ephemeral: cmd.ephemeral ? cmd.ephemeral : false});
                cmd.slashExecute(client, interaction);
            }
        }
    }
}